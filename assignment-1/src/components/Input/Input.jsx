import React, { useId } from 'react';
import PropTypes from 'prop-types';
import styles from './module.module.css';

/**
 * Input Component - A beautiful, accessible text field.
 * Uses BEM naming convention combined with CSS Modules for clean scoping.
 *
 * Why: Standard inputs are static and dry. We implement smooth floating borders,
 * glowing neon focus indicators, optional helper text, inline icons, and 
 * eye-catching wobble animations for error states.
 */
const Input = React.forwardRef(({
  label,
  placeholder,
  type = 'text',
  error,
  helperText,
  value,
  onChange,
  disabled = false,
  required = false,
  icon,
  className = '',
  id,
  ...props
}, ref) => {
  // Generate a unique ID if one is not provided, maintaining accessibility connection
  const fallbackId = useId();
  const inputId = id || fallbackId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  // Determine BEM modifier classes
  const errorClass = error ? styles['input-group--error'] : '';
  const disabledClass = disabled ? styles['input-group--disabled'] : '';
  const hasIconClass = icon ? styles['input-group--has-icon'] : '';

  const composedClasses = `${styles['input-group']} ${errorClass} ${disabledClass} ${hasIconClass} ${className}`.trim();

  return (
    <div className={composedClasses}>
      {label && (
        <label htmlFor={inputId} className={styles['input-group__label']}>
          {label}
          {required && <span className={styles['input-group__required']} aria-hidden="true"> *</span>}
        </label>
      )}
      
      <div className={styles['input-group__container']}>
        {icon && (
          <span className={styles['input-group__icon']} aria-hidden="true">
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={styles['input-group__field']}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : (helperText ? helperId : undefined)
          }
          {...props}
        />
      </div>

      {error ? (
        <p id={errorId} className={styles['input-group__error-msg']} role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className={styles['input-group__helper-msg']}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /** The text label above the input */
  label: PropTypes.string,
  /** Placeholder text shown inside empty input */
  placeholder: PropTypes.string,
  /** Type of the HTML input element */
  type: PropTypes.string,
  /** Error message to show. Triggers invalid visual states and animations */
  error: PropTypes.string,
  /** Sub-text to help explain the input requirements */
  helperText: PropTypes.string,
  /** Current text value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback fired when typing */
  onChange: PropTypes.func,
  /** Prevent input interactions */
  disabled: PropTypes.bool,
  /** Require field validation */
  required: PropTypes.bool,
  /** Inline graphic or Lucide icon */
  icon: PropTypes.node,
  /** Custom wrapper classes */
  className: PropTypes.string,
  /** Explicit element id */
  id: PropTypes.string,
};

export default Input;
