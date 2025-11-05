import { useState, useMemo, memo } from 'react';
import { Button } from '../shared';
import { EMAIL_DOMAINS } from './EmailForm.constants';
import { validateEmail } from './utils/validateEmail';
import { ArrowLeft } from 'lucide-react';
import { generateEmailSuggestions } from './utils/generateEmailSuggestions';
import './EmailForm.css';

export const EmailForm = memo(({ onSubmit, onBack }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailSuggestions = useMemo(() => 
    generateEmailSuggestions(email, EMAIL_DOMAINS), 
    [email]
  );

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (error) {
      setError('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setEmail(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateEmail(email);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    onSubmit(email);
  };

  return (
    <div className="email-form-screen">
      {onBack && (
        <Button onClick={onBack} variant="secondary" className="back-button">
          <ArrowLeft size={20} /> Back
        </Button>
      )}
      
      <div className="email-form-container">
        <div className="email-form-header">
          <h2 className="email-form-title">Almost Done!</h2>
          <p className="email-form-subtitle">
            Enter your email to see your quiz results
          </p>
        </div>

        <form onSubmit={handleSubmit} className="email-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="email-input-wrapper">
            <input
              type="email"
              id="email"
                className={`form-input ${error ? 'form-input-error' : ''} ${emailSuggestions.length > 0 ? 'form-input-with-suggestions' : ''}`}
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              disabled={isSubmitting}
                autoComplete="off"
              />
              {emailSuggestions.length > 0 && (
                <ul className="email-suggestions-list">
                  {emailSuggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      className="email-suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(suggestion);
                      }}
                    >
                      {suggestion}
                    </li>
              ))}
                </ul>
              )}
            </div>
            {error && (
              <p className="error-message">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'View Results'}
          </Button>
        </form>
      </div>
    </div>
  );
});

EmailForm.displayName = 'EmailForm';

