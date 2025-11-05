import { useCallback } from "react";
import { QUIZ_ACTIONS } from "../actions/quizActions";
import { isLastQuestion, getLastQuestionIndex } from "../utils/quizHelpers";
import { getNextNavigationAction } from "../utils/navigationHelpers";
import {
  markQuizAsStarted,
  clearQuizStarted,
  clearQuizState,
} from "../../utils/storage";

export const useQuizNavigation = (state, dispatch, questions) => {
  const handleStart = useCallback(() => {
    markQuizAsStarted();
    dispatch({ type: QUIZ_ACTIONS.START_QUIZ });
  }, [dispatch]);

  const handleAnswer = useCallback(
    (answer) => {
      const lastQuestion = isLastQuestion(
        state.currentQuestionIndex,
        questions.length
      );

      dispatch({
        type: QUIZ_ACTIONS.ANSWER_QUESTION,
        payload: { answer, isLastQuestion: lastQuestion },
      });
    },
    [state.currentQuestionIndex, questions.length, dispatch]
  );

  const handleBackFromQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: QUIZ_ACTIONS.GO_BACK });
    }
  }, [state.currentQuestionIndex, dispatch]);

  const handleForwardFromQuestion = useCallback(() => {
    const nextAction = getNextNavigationAction(
      state.currentQuestionIndex,
      state.userAnswers.length,
      questions.length
    );

    switch (nextAction) {
      case "email":
        dispatch({ type: QUIZ_ACTIONS.GO_TO_EMAIL_FROM_QUESTION });
        break;
      case "next_question":
        dispatch({ type: QUIZ_ACTIONS.GO_FORWARD });
        break;
      case "none":
      default:
        break;
    }
  }, [
    state.currentQuestionIndex,
    state.userAnswers.length,
    questions.length,
    dispatch,
  ]);

  const handleBackFromEmail = useCallback(() => {
    dispatch({
      type: QUIZ_ACTIONS.GO_TO_EMAIL,
      payload: { lastQuestionIndex: getLastQuestionIndex(questions.length) },
    });
  }, [questions.length, dispatch]);

  const handleEmailSubmit = useCallback(
    (email) => {
      dispatch({
        type: QUIZ_ACTIONS.SUBMIT_EMAIL,
        payload: { email },
      });
    },
    [dispatch]
  );

  const handleRestart = useCallback(() => {
    clearQuizStarted();
    clearQuizState();
    dispatch({ type: QUIZ_ACTIONS.RESTART_QUIZ });
  }, [dispatch]);

  return {
    handleStart,
    handleAnswer,
    handleBackFromQuestion,
    handleForwardFromQuestion,
    handleBackFromEmail,
    handleEmailSubmit,
    handleRestart,
  };
};
