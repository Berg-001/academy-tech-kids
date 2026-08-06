(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.QuizCore = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function formatTime(totalSeconds) {
    const safe = Math.max(0, Number.isFinite(totalSeconds) ? Math.floor(totalSeconds) : 0);
    const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
    const seconds = (safe % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function calculateScore(answers, questions) {
    return questions.reduce((score, question, index) => (
      answers[index] === question.correct ? score + 1 : score
    ), 0);
  }

  function progressPercent(completed, total) {
    if (!Number.isFinite(total) || total <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
  }

  function rotateQuestion(question, offset) {
    const options = Array.isArray(question.options) ? question.options.slice() : [];
    if (!options.length) return { ...question, options, correct: 0 };
    const rotation = ((Math.floor(offset) % options.length) + options.length) % options.length;
    const rotated = options.slice(rotation).concat(options.slice(0, rotation));
    const correct = (question.correct - rotation + options.length) % options.length;
    return { ...question, options: rotated, correct };
  }

  return { formatTime, calculateScore, progressPercent, rotateQuestion };
}));
