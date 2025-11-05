import { QUIZ_ACTIONS } from "../actions/quizActions";
import { SCREENS } from "../constants/screens";

export const initialQuizState = {
  currentScreen: SCREENS.WELCOME,
  currentQuestionIndex: 0,
  userAnswers: [],
  userEmail: "",
  isFinished: false,
  isLoaded: false,
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case QUIZ_ACTIONS.START_QUIZ:
      return {
        ...state,
        currentScreen: SCREENS.QUESTION,
      };

    case QUIZ_ACTIONS.ANSWER_QUESTION: {
      const { answer, isLastQuestion } = action.payload;

      return {
        ...state,
        userAnswers: [...state.userAnswers, answer],
        currentQuestionIndex: isLastQuestion
          ? state.currentQuestionIndex
          : state.currentQuestionIndex + 1,
        currentScreen: isLastQuestion ? SCREENS.EMAIL : SCREENS.QUESTION,
      };
    }

    case QUIZ_ACTIONS.GO_BACK: {
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };
    }

    case QUIZ_ACTIONS.GO_FORWARD: {
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }

    case QUIZ_ACTIONS.GO_TO_EMAIL:
      return {
        ...state,
        currentScreen: SCREENS.QUESTION,
        currentQuestionIndex: action.payload.lastQuestionIndex,
      };

    case QUIZ_ACTIONS.GO_TO_EMAIL_FROM_QUESTION:
      return {
        ...state,
        currentScreen: SCREENS.EMAIL,
      };

    case QUIZ_ACTIONS.SUBMIT_EMAIL:
      return {
        ...state,
        userEmail: action.payload.email,
        isFinished: true,
        currentScreen: SCREENS.FINAL,
      };

    case QUIZ_ACTIONS.RESTART_QUIZ:
      return {
        ...initialQuizState,
        isLoaded: true,
      };

    case QUIZ_ACTIONS.LOAD_STATE:
      return {
        ...state,
        ...action.payload.savedState,
        isLoaded: true,
      };

    case QUIZ_ACTIONS.SET_LOADED:
      return {
        ...state,
        isLoaded: true,
      };

    default:
      return state;
  }
};
