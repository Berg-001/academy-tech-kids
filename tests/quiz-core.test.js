const test = require("node:test");
const assert = require("node:assert/strict");
const { formatTime, calculateScore, progressPercent, rotateQuestion, summarizeAttempts, csvEscape } = require("../assets/quiz-core.js");

test("formata duração sem valores negativos", () => {
  assert.equal(formatTime(65), "01:05");
  assert.equal(formatTime(-2), "00:00");
  assert.equal(formatTime(Number.NaN), "00:00");
});

test("calcula apenas respostas corretas", () => {
  const questions = [{ correct: 1 }, { correct: 0 }, { correct: 2 }];
  assert.equal(calculateScore([1, 1, 2], questions), 2);
  assert.equal(calculateScore([], questions), 0);
});

test("limita o progresso ao intervalo de zero a cem", () => {
  assert.equal(progressPercent(1, 4), 25);
  assert.equal(progressPercent(8, 4), 100);
  assert.equal(progressPercent(-1, 4), 0);
  assert.equal(progressPercent(1, 0), 0);
});

test("rotaciona alternativas preservando a resposta correta", () => {
  const rotated = rotateQuestion({ options: ["A", "B", "C"], correct: 0 }, 1);
  assert.deepEqual(rotated.options, ["B", "C", "A"]);
  assert.equal(rotated.correct, 2);
});

test("cada semana possui dez questões válidas", () => {
  require("../assets/weeks.js");
  assert.equal(global.AcademyWeeks.length, 6);
  for (const week of global.AcademyWeeks) {
    assert.equal(week.questions.length, 10, `Semana ${week.number}`);
    for (const [text, options, correct, explanation] of week.questions) {
      assert.ok(text.length > 10);
      assert.equal(options.length, 3);
      assert.ok(correct >= 0 && correct < options.length);
      assert.ok(explanation.length > 10);
    }
  }
});

test("resume tentativas e calcula evolução", () => {
  const summary = summarizeAttempts([
    { score: 5, total: 10 },
    { score: 7, total: 10 },
    { score: 9, total: 10 }
  ]);
  assert.deepEqual(summary, { attempts: 3, average: 70, best: 90, latest: 90, evolution: 40 });
  assert.deepEqual(summarizeAttempts([]), { attempts: 0, average: 0, best: 0, latest: 0, evolution: 0 });
});

test("protege valores especiais na exportação CSV", () => {
  assert.equal(csvEscape("texto simples"), "texto simples");
  assert.equal(csvEscape('resposta; com "aspas"'), '"resposta; com ""aspas"""');
  assert.equal(csvEscape("=1+1"), "'=1+1");
  assert.equal(csvEscape(null), "");
});
