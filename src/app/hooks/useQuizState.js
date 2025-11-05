import { useReducer, useEffect } from "react";
import { quizReducer, initialQuizState } from "../reducers/quizReducer";
import { QUIZ_ACTIONS } from "../actions/quizActions";
import {
  saveQuizState,
  loadQuizState,
  hasQuizStarted,
} from "../../utils/storage";

export const useQuizState = () => {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  useEffect(() => {
    const quizStarted = hasQuizStarted();
    const savedState = loadQuizState();

    if (quizStarted && savedState) {
      dispatch({
        type: QUIZ_ACTIONS.LOAD_STATE,
        payload: { savedState },
      });
    } else {
      dispatch({ type: QUIZ_ACTIONS.SET_LOADED });
    }
  }, []);

  useEffect(() => {
    if (!state.isLoaded) {
      return;
    }

    const stateToSave = {
      currentScreen: state.currentScreen,
      currentQuestionIndex: state.currentQuestionIndex,
      userAnswers: state.userAnswers,
      userEmail: state.userEmail,
      isFinished: state.isFinished,
    };
    saveQuizState(stateToSave);
  }, [state]);

  return { state, dispatch };
};
