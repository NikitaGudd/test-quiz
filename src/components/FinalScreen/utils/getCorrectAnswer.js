export const getCorrectAnswer = (question) => {
  return question.answers.find((answer) => answer.isCorrect);
};
