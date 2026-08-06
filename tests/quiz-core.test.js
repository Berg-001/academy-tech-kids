const test = require("node:test");
const assert = require("node:assert/strict");
const { formatTime, calculateScore, progressPercent } = require("../assets/quiz-core.js");

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
