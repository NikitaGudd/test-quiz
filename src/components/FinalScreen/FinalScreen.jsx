import { memo } from 'react';
import { Button } from '../shared';
import { calculateScore } from './utils/calculateScore';
import { getCorrectAnswer } from './utils/getCorrectAnswer';
import './FinalScreen.css';

export const FinalScreen = memo(({ email, answers, questions, onRestart }) => {
  const totalQuestions = questions.length;
  const { correctAnswersCount, scorePercentage } = calculateScore(answers, totalQuestions);

  return (
    <div className="final-screen">
      <div className="final-screen-container">
        <div className="final-header">
          <div className="score-circle">
            <span className="score-percentage">{scorePercentage}%</span>
            <span className="score-label">Score</span>
          </div>
          <h2 className="final-title">Quiz Complete!</h2>
          <p className="final-subtitle">
            You got {correctAnswersCount} out of {totalQuestions} questions correct
          </p>
          <div className="email-display">
            <span className="email-label">Results sent to:</span>
            <span className="email-value">{email}</span>
          </div>
        </div>

        <div className="answers-review-wrapper">
          <div className="answers-review">
            <h3 className="review-title">Your Answers</h3>
            <div className="answers-list">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer.isCorrect;

                return (
                  <div key={question.id} className="answer-review-item">
                    <div className="review-question">
                      <span className="review-number">Q{index + 1}:</span>
                      <span className="review-text">{question.question}</span>
                    </div>
                    <div className={`review-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <span className="review-icon">{isCorrect ? '✓' : '✗'}</span>
                      <span className="review-answer-text">{userAnswer.text}</span>
                    </div>
                    {!isCorrect && (
                      <div className="correct-answer-hint">
                        <span className="hint-label">Correct answer:</span>
                        <span className="hint-text">
                          {getCorrectAnswer(question).text}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="final-footer">
          <Button onClick={onRestart} variant="primary" className="restart-button">
            Take Quiz Again
          </Button>
        </div>
      </div>
    </div>
  );
});

FinalScreen.displayName = 'FinalScreen';

