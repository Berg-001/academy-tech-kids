(function () {
  "use strict";

  const weeks = globalThis.AcademyWeeks || [];
  const progressKey = "atk-learning-progress-v2";
  const historyKey = "atk-attempt-history-v1";
  const preferenceKey = "atk-preferences-v1";
  const visitKey = "atk-local-visits-v1";
  const maxAttemptsPerWeek = 20;
  const mentorMode = new URLSearchParams(location.search).get("modo") === "mentor";
  const state = {
    weekIndex: 0,
    questionIndex: 0,
    answers: [],
    duration: 0,
    remaining: 0,
    elapsed: 0,
    timerId: null,
    paused: false,
    finished: false
  };
  const byId = (id) => document.getElementById(id);

  function registerLocalVisit() {
    let visits = 1;
    try {
      const stored = Number(localStorage.getItem(visitKey));
      visits = Number.isSafeInteger(stored) && stored >= 0 ? stored + 1 : 1;
      localStorage.setItem(visitKey, String(visits));
    } catch (_) { /* Storage may be disabled. */ }
    byId("visit-count").textContent = visits.toLocaleString("pt-BR");
  }

  function readStorage(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && typeof value === "object" ? value : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* Storage may be disabled. */ }
  }

  function getProgress() {
    return readStorage(progressKey, {});
  }

  function getHistory() {
    return readStorage(historyKey, {});
  }

  function allAttempts() {
    const history = getHistory();
    return weeks.flatMap((week) => Array.isArray(history[week.id]) ? history[week.id] : []);
  }

  function saveAttempt(attempt) {
    const history = getHistory();
    const attempts = Array.isArray(history[attempt.weekId]) ? history[attempt.weekId] : [];
    history[attempt.weekId] = attempts.concat(attempt).slice(-maxAttemptsPerWeek);
    writeStorage(historyKey, history);
  }

  function percentage(attempt) {
    return attempt.total > 0 ? Math.round((attempt.score / attempt.total) * 100) : 0;
  }

  function renderInsights() {
    const history = getHistory();
    const attempts = allAttempts();
    const hasAttempts = attempts.length > 0;
    byId("insights-empty").hidden = hasAttempts;
    byId("insights-content").hidden = !hasAttempts;
    byId("export-json").disabled = !hasAttempts;
    byId("export-csv").disabled = !hasAttempts;
    byId("clear-history").disabled = !hasAttempts;
    if (!hasAttempts) return;

    const overall = QuizCore.summarizeAttempts(attempts);
    const completedWeeks = weeks.filter((week) => Array.isArray(history[week.id]) && history[week.id].length).length;
    byId("metric-attempts").textContent = String(overall.attempts);
    byId("metric-average").textContent = `${overall.average}%`;
    byId("metric-best").textContent = `${overall.best}%`;
    byId("metric-weeks").textContent = `${completedWeeks}/${weeks.length}`;

    const table = byId("insights-table");
    table.replaceChildren();
    weeks.forEach((week) => {
      const weekAttempts = Array.isArray(history[week.id]) ? history[week.id] : [];
      const summary = QuizCore.summarizeAttempts(weekAttempts);
      const row = document.createElement("tr");
      const values = weekAttempts.length
        ? [`Semana ${week.number}`, summary.attempts, `${summary.average}%`, `${summary.best}%`, `${summary.latest}%`, `${summary.evolution >= 0 ? "+" : ""}${summary.evolution} p.p.`]
        : [`Semana ${week.number}`, 0, "—", "—", "—", "—"];
      values.forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = String(value);
        row.append(cell);
      });
      table.append(row);
    });
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportJson() {
    const payload = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      privacy: "Sem nome ou identificador pessoal; dados originados somente deste navegador.",
      attemptsByWeek: getHistory()
    };
    downloadFile("academy-tech-kids-tentativas.json", JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  }

  function exportCsv() {
    const headers = ["tentativa_id", "semana", "data", "acertos", "total", "aproveitamento_percentual", "tempo_segundos", "cronometro", "limite_segundos", "questao", "enunciado", "resposta_marcada", "resposta_correta", "acertou"];
    const rows = [headers];
    allAttempts().forEach((attempt) => {
      attempt.responses.forEach((response) => rows.push([
        attempt.id, attempt.weekNumber, attempt.completedAt, attempt.score, attempt.total, percentage(attempt), attempt.elapsedSeconds,
        attempt.timed ? "sim" : "não", attempt.timeLimitSeconds || "", response.questionNumber, response.question,
        response.selectedAnswer || "não respondida", response.correctAnswer, response.correct ? "sim" : "não"
      ]));
    });
    const csv = rows.map((row) => row.map(QuizCore.csvEscape).join(";")).join("\r\n");
    downloadFile("academy-tech-kids-tentativas.csv", `\uFEFF${csv}`, "text/csv;charset=utf-8");
  }

  function currentWeek() {
    return weeks[state.weekIndex];
  }

  function normalizedQuestions() {
    return currentWeek().questions.map(([text, options, correct, explanation], index) => (
      QuizCore.rotateQuestion({ text, options, correct, explanation }, index + state.weekIndex)
    ));
  }

  function renderWeekNavigation() {
    const navigation = byId("week-navigation");
    const progress = getProgress();
    navigation.replaceChildren();
    weeks.forEach((week, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "week-card";
      button.dataset.weekIndex = String(index);
      button.setAttribute("role", "listitem");
      button.setAttribute("aria-current", index === state.weekIndex ? "step" : "false");
      const result = progress[week.id];
      const status = result ? `${result.score}/${result.total} acertos` : "Disponível";
      button.innerHTML = `<span class="week-number">Semana ${week.number}</span><span class="week-card-emoji" aria-hidden="true">${week.emoji}</span><strong>${week.title}</strong><span class="week-card-status">${result ? "✓ " : ""}${status}</span>`;
      button.addEventListener("click", () => selectWeek(index, true));
      navigation.append(button);
    });
  }

  function resetQuizView() {
    stopTimer();
    state.questionIndex = 0;
    state.answers = [];
    state.elapsed = 0;
    state.finished = false;
    state.paused = false;
    byId("quiz-intro").hidden = false;
    byId("quiz-active").hidden = true;
    byId("quiz-result").hidden = true;
  }

  function selectWeek(index, scroll) {
    if (!weeks[index]) return;
    state.weekIndex = index;
    const week = currentWeek();
    resetQuizView();
    byId("week-label").textContent = `Semana ${week.number} · ${week.theme} · ${week.duration}`;
    byId("week-title").textContent = week.title;
    byId("week-summary").textContent = week.summary;
    byId("week-emoji").textContent = week.emoji;
    byId("week-objective").textContent = week.objective;
    byId("lesson-title").textContent = week.title;
    byId("lesson-stage-text").textContent = week.summary;
    byId("lesson-symbols").textContent = `${week.emoji} 💡 🎯`;
    byId("week-transcript").textContent = week.transcript;
    byId("week-practice").textContent = week.practice;

    const concepts = byId("concept-list");
    concepts.replaceChildren();
    week.concepts.forEach(([title, description]) => {
      const item = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = `${title}. `;
      item.append(strong, document.createTextNode(description));
      concepts.append(item);
    });

    const prompts = byId("prompt-card");
    prompts.replaceChildren();
    const promptTitle = document.createElement("strong");
    promptTitle.textContent = "Pistas";
    prompts.append(promptTitle);
    week.prompts.forEach((prompt) => {
      const span = document.createElement("span");
      span.textContent = prompt;
      prompts.append(span);
    });

    byId("next-week").hidden = state.weekIndex === weeks.length - 1;
    history.replaceState(null, "", `#${week.id}`);
    renderWeekNavigation();
    if (scroll) byId("week-content").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setTimerText() {
    byId("timer").textContent = state.duration ? QuizCore.formatTime(state.remaining) : "Sem limite";
  }

  function stopTimer() {
    if (state.timerId) window.clearInterval(state.timerId);
    state.timerId = null;
  }

  function finishQuiz(reason) {
    if (state.finished) return;
    state.finished = true;
    stopTimer();
    const questions = normalizedQuestions();
    const score = QuizCore.calculateScore(state.answers, questions);
    const week = currentWeek();
    const responses = questions.map((question, index) => {
      const selected = state.answers[index];
      return {
        questionNumber: index + 1,
        question: question.text,
        selectedAnswer: Number.isInteger(selected) ? question.options[selected] : null,
        correctAnswer: question.options[question.correct],
        correct: selected === question.correct
      };
    });
    const completedAt = new Date().toISOString();
    saveAttempt({
      id: `${Date.now()}-${week.id}`,
      weekId: week.id,
      weekNumber: week.number,
      weekTitle: week.title,
      completedAt,
      score,
      total: questions.length,
      elapsedSeconds: state.elapsed,
      timed: state.duration > 0,
      timeLimitSeconds: state.duration || null,
      finishReason: reason,
      responses
    });
    const progress = getProgress();
    const previous = progress[week.id];
    if (!previous || score >= previous.score) {
      progress[week.id] = { score, total: questions.length, completedAt };
      writeStorage(progressKey, progress);
    }
    byId("quiz-active").hidden = true;
    byId("quiz-result").hidden = false;
    byId("result-title").textContent = `Você acertou ${score} de ${questions.length}`;
    byId("result-message").textContent = reason === "time"
      ? "O tempo terminou, mas isso não reduz seu progresso. Revise e tente novamente quando quiser."
      : score === questions.length
        ? "Excelente investigação! Você concluiu o desafio com todos os acertos."
        : score >= 7
          ? "Muito bem! Revise as explicações e tente explicar uma resposta com suas palavras."
          : "Você deu um passo importante. Reveja a microaula e faça uma nova tentativa sem pressa.";
    byId("result-time").textContent = `Tempo de atividade: ${QuizCore.formatTime(state.elapsed)}.`;
    renderWeekNavigation();
    renderInsights();
    byId("quiz-result").focus();
  }

  function tick() {
    if (state.paused || state.finished) return;
    state.elapsed += 1;
    if (state.duration) {
      state.remaining -= 1;
      setTimerText();
      if (state.remaining <= 0) finishQuiz("time");
    }
  }

  function renderQuestion() {
    const questions = normalizedQuestions();
    const question = questions[state.questionIndex];
    byId("progress-text").textContent = `Questão ${state.questionIndex + 1} de ${questions.length}`;
    const progress = byId("progress-bar");
    progress.max = questions.length;
    progress.value = state.questionIndex;
    progress.textContent = `${state.questionIndex} de ${questions.length}`;
    byId("question-text").textContent = question.text;
    const options = byId("answer-options");
    options.replaceChildren();
    question.options.forEach((option, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = String(index);
      label.append(input, document.createTextNode(option));
      options.append(label);
    });
    byId("answer-error").hidden = true;
    byId("quiz-form").hidden = false;
    byId("feedback").hidden = true;
    byId("question-text").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function startQuiz() {
    stopTimer();
    const selected = document.querySelector('input[name="duration"]:checked');
    state.questionIndex = 0;
    state.answers = [];
    state.duration = Number(selected ? selected.value : 0);
    state.remaining = state.duration;
    state.elapsed = 0;
    state.paused = false;
    state.finished = false;
    byId("quiz-intro").hidden = true;
    byId("quiz-result").hidden = true;
    byId("quiz-active").hidden = false;
    byId("pause-timer").hidden = !state.duration;
    byId("pause-timer").textContent = "Pausar";
    byId("pause-timer").setAttribute("aria-pressed", "false");
    setTimerText();
    state.timerId = window.setInterval(tick, 1000);
    renderQuestion();
  }

  byId("quiz-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      byId("answer-error").hidden = false;
      return;
    }
    const questions = normalizedQuestions();
    const answer = Number(selected.value);
    const question = questions[state.questionIndex];
    state.answers[state.questionIndex] = answer;
    byId("quiz-form").hidden = true;
    byId("feedback").hidden = false;
    byId("feedback-title").textContent = answer === question.correct ? "Boa! Resposta correta." : "Ainda não. Vamos entender.";
    byId("feedback-text").textContent = question.explanation;
    byId("next-question").textContent = state.questionIndex === questions.length - 1 ? "Ver resultado" : "Próxima questão";
    byId("feedback").focus();
  });

  byId("next-question").addEventListener("click", function () {
    state.questionIndex += 1;
    if (state.questionIndex >= normalizedQuestions().length) finishQuiz("complete");
    else renderQuestion();
  });

  byId("pause-timer").addEventListener("click", function () {
    state.paused = !state.paused;
    this.textContent = state.paused ? "Continuar" : "Pausar";
    this.setAttribute("aria-pressed", String(state.paused));
  });

  byId("contrast-toggle").addEventListener("click", function () {
    const enabled = document.body.classList.toggle("high-contrast");
    this.setAttribute("aria-pressed", String(enabled));
    writeStorage(preferenceKey, { highContrast: enabled });
  });

  byId("clear-data").addEventListener("click", function () {
    try {
      localStorage.removeItem(progressKey);
      localStorage.removeItem(historyKey);
    } catch (_) { /* Storage may be disabled. */ }
    byId("result-message").textContent = "O progresso das atividades foi apagado deste navegador.";
    renderWeekNavigation();
    renderInsights();
  });

  byId("export-json").addEventListener("click", exportJson);
  byId("export-csv").addEventListener("click", exportCsv);
  byId("clear-history").addEventListener("click", function () {
    const confirmed = window.confirm("Apagar permanentemente todas as tentativas e pontuações deste navegador?");
    if (!confirmed) return;
    try {
      localStorage.removeItem(historyKey);
      localStorage.removeItem(progressKey);
    } catch (_) { /* Storage may be disabled. */ }
    renderWeekNavigation();
    renderInsights();
  });

  byId("start-quiz").addEventListener("click", startQuiz);
  byId("retry-quiz").addEventListener("click", startQuiz);
  byId("next-week").addEventListener("click", () => selectWeek(state.weekIndex + 1, true));

  const preferences = readStorage(preferenceKey, {});
  registerLocalVisit();
  if (preferences.highContrast) {
    document.body.classList.add("high-contrast");
    byId("contrast-toggle").setAttribute("aria-pressed", "true");
  }
  const hashIndex = weeks.findIndex((week) => `#${week.id}` === location.hash);
  if (mentorMode) byId("mentor-panel").hidden = false;
  selectWeek(hashIndex >= 0 ? hashIndex : 0, false);
  renderInsights();
}());
