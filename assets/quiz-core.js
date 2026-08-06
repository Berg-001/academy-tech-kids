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

  return { formatTime, calculateScore, progressPercent };
}));
