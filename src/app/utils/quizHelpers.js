export const isLastQuestion = (currentIndex, totalQuestions) => {
  return currentIndex >= totalQuestions - 1;
};

export const getLastQuestionIndex = (totalQuestions) => {
  return totalQuestions - 1;
};
