import { useMemo } from 'react';
import { WelcomeScreen } from '../components/WelcomeScreen/WelcomeScreen';
import { QuestionScreen } from '../components/QuestionScreen/QuestionScreen';
import { EmailForm } from '../components/EmailForm/EmailForm';
import { FinalScreen } from '../components/FinalScreen/FinalScreen';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { SCREENS } from './constants/screens';
import { useQuizState } from './hooks/useQuizState';
import { useQuizNavigation } from './hooks/useQuizNavigation';
import './App.css';

function App() {
  const { state, dispatch } = useQuizState();
  const navigation = useQuizNavigation(state, dispatch, QUIZ_QUESTIONS);

  const currentQuestion = useMemo(() => 
    QUIZ_QUESTIONS[state.currentQuestionIndex],
    [state.currentQuestionIndex]
  );

  const previousAnswer = useMemo(() => 
    state.userAnswers[state.currentQuestionIndex],
    [state.userAnswers, state.currentQuestionIndex]
  );

  const canGoForward = state.currentQuestionIndex < state.userAnswers.length;
  const questionNumber = state.currentQuestionIndex + 1;

  if (!state.isLoaded) {
    return null;
  }

  return (
    <div className="app">
      <main className="app-main">
        {state.currentScreen === SCREENS.WELCOME && (
          <WelcomeScreen onStart={navigation.handleStart} />
        )}

        {state.currentScreen === SCREENS.QUESTION && (
          <QuestionScreen
            key={currentQuestion.id}
            question={currentQuestion}
            previousAnswer={previousAnswer}
            onAnswer={navigation.handleAnswer}
            onBack={navigation.handleBackFromQuestion}
            onForward={navigation.handleForwardFromQuestion}
            canGoForward={canGoForward}
            questionNumber={questionNumber}
            totalQuestions={QUIZ_QUESTIONS.length}
          />
        )}

        {state.currentScreen === SCREENS.EMAIL && (
          <EmailForm 
            onSubmit={navigation.handleEmailSubmit}
            onBack={navigation.handleBackFromEmail}
          />
        )}

        {state.currentScreen === SCREENS.FINAL && (
          <FinalScreen
            email={state.userEmail}
            answers={state.userAnswers}
            questions={QUIZ_QUESTIONS}
            onRestart={navigation.handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;

