import { BUTTON_VARIANTS, BUTTON_TYPES } from './Button.constants';
import './Button.css';

export const Button = ({ 
  children, 
  variant = BUTTON_VARIANTS.PRIMARY, 
  onClick, 
  disabled = false, 
  type = BUTTON_TYPES.BUTTON,
  className = '',
  ...props 
}) => {
  const buttonClass = `button button-${variant} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

