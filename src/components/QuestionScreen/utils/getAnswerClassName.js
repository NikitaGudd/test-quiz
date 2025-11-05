export const getAnswerClassName = (answer, showFeedback, selectedAnswer) => {
  if (!showFeedback) {
    if (answer.id === selectedAnswer?.id) {
      return "answer-option selected";
    }
    return "answer-option";
  }

  if (answer.id === selectedAnswer?.id) {
    return answer.isCorrect
      ? "answer-option correct"
      : "answer-option incorrect";
  }

  if (answer.isCorrect) {
    return "answer-option correct";
  }

  return "answer-option";
};
