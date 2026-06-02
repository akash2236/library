import React from 'react';
import PropTypes from 'prop-types';
import styles from './module.module.css';

/**
 * Button Component - A highly polished, accessible, and themeable button.
 * Uses BEM naming convention combined with CSS Modules for clean scoping.
 *
 * Why: Standard buttons are boring. We implement smooth micro-animations,
 * 3D-like tap feedback, subtle glow states, and fully responsive accessibility.
 */
const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  
  // Combine CSS Module classes using the BEM format
  const variantClass = styles[`btn--${variant}`] || styles['btn--primary'];
  const sizeClass = styles[`btn--${size}`] || styles['btn--md'];
  const disabledClass = disabled ? styles['btn--disabled'] : '';
  
  // Compose final class name safely
  const composedClasses = `${styles.btn} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      ref={ref}
      type={type}
      className={composedClasses}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.btn__icon} aria-hidden="true">{icon}</span>
      )}
      <span className={styles.btn__content}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={`${styles.btn__icon} ${styles['btn__icon--right']}`} aria-hidden="true">{icon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /** Content to render inside the button */
  children: PropTypes.node.isRequired,
  /** Visual variation of the button */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'success', 'warning', 'danger']),
  /** Size multiplier of the button */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Disabled state of the button */
  disabled: PropTypes.bool,
  /** Click event handler */
  onClick: PropTypes.func,
  /** Standard HTML button types */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Extra class names for styling extensions */
  className: PropTypes.string,
  /** Optional icon element */
  icon: PropTypes.node,
  /** Side where the icon should render */
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Button;
