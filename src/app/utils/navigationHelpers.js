export const canNavigateForward = (currentIndex, answersLength) => {
  return currentIndex < answersLength;
};

export const isLastAnsweredQuestion = (currentIndex, answersLength) => {
  return currentIndex === answersLength - 1;
};

export const isLastQuestionInQuiz = (currentIndex, totalQuestions) => {
  return currentIndex === totalQuestions - 1;
};

export const getNextNavigationAction = (
  currentIndex,
  answersLength,
  totalQuestions
) => {
  if (!canNavigateForward(currentIndex, answersLength)) {
    return "none";
  }

  const isLastAnswered = isLastAnsweredQuestion(currentIndex, answersLength);
  const isLastOverall = isLastQuestionInQuiz(currentIndex, totalQuestions);

  if (isLastAnswered && isLastOverall) {
    return "email";
  }

  if (currentIndex < totalQuestions - 1) {
    return "next_question";
  }

  return "none";
};
