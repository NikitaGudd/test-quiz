import { useState, useEffect, memo } from 'react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { Button } from '../shared';
import { FEEDBACK_DELAY } from './QuestionScreen.constants';
import { getAnswerClassName } from './utils/getAnswerClassName';
import './QuestionScreen.css';

export const QuestionScreen = memo(({ question, previousAnswer, onAnswer, onBack, onForward, canGoForward, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(previousAnswer || null);
  const [showFeedback, setShowFeedback] = useState(!!previousAnswer);
  const [shouldTriggerAnswer, setShouldTriggerAnswer] = useState(false);

  const handleAnswerClick = (answer) => {
    if (showFeedback) {
      return;
    }
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setShouldTriggerAnswer(true);
  };

  useEffect(() => {
    if (!shouldTriggerAnswer || !selectedAnswer) {
      return;
    }

    const timerId = setTimeout(() => {
      onAnswer(selectedAnswer);
      setShouldTriggerAnswer(false);
    }, FEEDBACK_DELAY);

    return () => {
      clearTimeout(timerId);
    };
  }, [shouldTriggerAnswer, selectedAnswer, onAnswer]);

  return (
    <div className="question-screen">
      <div className="question-header">
        <div className="navigation-buttons">
          {questionNumber > 1 && (
            <Button 
              onClick={onBack} 
              variant="secondary"
            >
              <ArrowLeft size={20} /> Back
            </Button>
          )}
          {canGoForward && (
            <Button 
              onClick={onForward} 
              variant="secondary"
            >
             Next <ArrowRight size={20} /> 
            </Button>
        )}
        </div>
        <div className="progress-indicator">
          Question {questionNumber} of {totalQuestions}
        </div>
      </div>

      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>

        <div className="answers-list">
          {question.answers.map((answer) => (
            <Button
              key={answer.id}
              className={getAnswerClassName(answer, showFeedback, selectedAnswer)}
              onClick={() => handleAnswerClick(answer)}
              disabled={showFeedback}
            >
              <span className="answer-text">{answer.text}</span>
              <span className="answer-icon" aria-hidden="true">
                {showFeedback && answer.isCorrect && <Check size={20} />}
                {showFeedback && !answer.isCorrect && answer.id === selectedAnswer?.id && <X size={20} />}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
});

QuestionScreen.displayName = 'QuestionScreen';

