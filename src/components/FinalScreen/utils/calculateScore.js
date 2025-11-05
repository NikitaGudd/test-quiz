export const calculateScore = (answers, totalQuestions) => {
  const correctAnswersCount = answers.filter(
    (answer) => answer.isCorrect
  ).length;
  const scorePercentage = Math.round(
    (correctAnswersCount / totalQuestions) * 100
  );

  return {
    correctAnswersCount,
    scorePercentage,
  };
};
