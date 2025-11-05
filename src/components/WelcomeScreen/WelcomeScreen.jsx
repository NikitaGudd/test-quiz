import { Button } from '../shared';
import './WelcomeScreen.css';

export const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Quiz App</h1>
          <p className="welcome-subtitle">
            Test your knowledge with our interactive quiz
          </p>

          <Button onClick={onStart} variant="primary" className="start-button">
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

