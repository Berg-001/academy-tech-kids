(function () {
  "use strict";

  const questions = [
    {
      text: "Qual frase explica melhor o que é tecnologia?",
      options: ["Somente aparelhos conectados à internet", "Conhecimento aplicado para resolver problemas", "Qualquer objeto que custa caro"],
      correct: 1,
      explanation: "Tecnologia é conhecimento aplicado. Ela pode existir com ou sem computador."
    },
    {
      text: "Qual item também pode ser considerado uma tecnologia?",
      options: ["Um lápis", "Apenas um videogame", "Somente um robô"],
      correct: 0,
      explanation: "O lápis é uma ferramenta criada para resolver a necessidade de escrever e desenhar."
    },
    {
      text: "Antes de avaliar uma tecnologia, qual pergunta é útil?",
      options: ["Ela tem a cor mais bonita?", "Qual problema ela resolve?", "Ela é a mais nova de todas?"],
      correct: 1,
      explanation: "Entender o problema ajuda a avaliar a utilidade, os benefícios e os limites da solução."
    },
    {
      text: "Um semáforo é tecnologia porque...",
      options: ["organiza o trânsito usando uma solução criada por pessoas", "sempre possui acesso à internet", "é usado somente por cientistas"],
      correct: 0,
      explanation: "O semáforo aplica conhecimento e regras para tornar o trânsito mais organizado e seguro."
    },
    {
      text: "Ao usar uma tecnologia, qual atitude é mais responsável?",
      options: ["Ignorar qualquer risco", "Compartilhar dados pessoais para terminar rápido", "Observar benefícios, limites e cuidados"],
      correct: 2,
      explanation: "Uso responsável inclui perceber benefícios, limites, impactos e cuidados de segurança."
    }
  ];

  const storageKey = "atk-week-01-result-v1";
  const state = { index: 0, answers: [], duration: 0, remaining: 0, elapsed: 0, timerId: null, paused: false, finished: false };
  const byId = (id) => document.getElementById(id);

  function safeStore(result) {
    try { localStorage.setItem(storageKey, JSON.stringify(result)); } catch (_) { /* Storage may be disabled. */ }
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
    const score = QuizCore.calculateScore(state.answers, questions);
    byId("quiz-active").hidden = true;
    byId("quiz-result").hidden = false;
    byId("result-title").textContent = `Você acertou ${score} de ${questions.length}`;
    byId("result-message").textContent = reason === "time"
      ? "O tempo terminou, mas isso não reduz seu progresso. Revise e tente novamente quando quiser."
      : score === questions.length
        ? "Excelente investigação! Agora tente explicar uma das respostas com suas palavras."
        : "Bom trabalho! As explicações mostram o que revisar antes de uma nova tentativa.";
    byId("result-time").textContent = `Tempo de atividade: ${QuizCore.formatTime(state.elapsed)}.`;
    safeStore({ score, total: questions.length, completedAt: new Date().toISOString() });
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
    const question = questions[state.index];
    byId("progress-text").textContent = `Questão ${state.index + 1} de ${questions.length}`;
    const progress = byId("progress-bar");
    progress.value = state.index;
    progress.textContent = `${state.index} de ${questions.length}`;
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
    byId("question-fieldset").focus();
  }

  function startQuiz() {
    stopTimer();
    const selected = document.querySelector('input[name="duration"]:checked');
    state.index = 0;
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
    const answer = Number(selected.value);
    const question = questions[state.index];
    state.answers[state.index] = answer;
    byId("quiz-form").hidden = true;
    byId("feedback").hidden = false;
    byId("feedback-title").textContent = answer === question.correct ? "Boa! Resposta correta." : "Ainda não. Vamos entender.";
    byId("feedback-text").textContent = question.explanation;
    byId("next-question").textContent = state.index === questions.length - 1 ? "Ver resultado" : "Próxima questão";
    byId("feedback").focus();
  });

  byId("next-question").addEventListener("click", function () {
    state.index += 1;
    if (state.index >= questions.length) finishQuiz("complete");
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
  });

  byId("clear-data").addEventListener("click", function () {
    try { localStorage.removeItem(storageKey); } catch (_) { /* Storage may be disabled. */ }
    byId("result-message").textContent = "Os dados desta atividade foram apagados deste navegador.";
  });

  byId("start-quiz").addEventListener("click", startQuiz);
  byId("retry-quiz").addEventListener("click", startQuiz);
}());
