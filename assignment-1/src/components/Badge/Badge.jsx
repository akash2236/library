import React from 'react';
import PropTypes from 'prop-types';
import styles from './module.module.css';

/**
 * Badge Component - A small, beautiful label indicating status or tags.
 * Uses BEM naming convention combined with CSS Modules for clean scoping.
 *
 * Why: Standard badges look like flat blocks. We implement high-contrast fill,
 * crisp outlines, and elegant neon-glass redundancies for that ultra-premium feel.
 */
const Badge = React.forwardRef(({
  text,
  children,
  color = 'primary',
  size = 'md',
  variant = 'glass',
  className = '',
  icon,
  ...props
}, ref) => {
  const content = text || children;
  
  // Compose modifier class names
  const colorClass = styles[`badge--${color}`] || styles['badge--primary'];
  const sizeClass = styles[`badge--${size}`] || styles['badge--md'];
  const variantClass = styles[`badge--${variant}`] || styles['badge--glass'];
  
  const composedClasses = `${styles.badge} ${colorClass} ${sizeClass} ${variantClass} ${className}`.trim();

  return (
    <span
      ref={ref}
      className={composedClasses}
      {...props}
    >
      {icon && <span className={styles.badge__icon} aria-hidden="true">{icon}</span>}
      <span className={styles.badge__content}>{content}</span>
    </span>
  );
});

Badge.displayName = 'Badge';

Badge.propTypes = {
  /** Text content (or pass via children) */
  text: PropTypes.string,
  /** React elements or node child content */
  children: PropTypes.node,
  /** Color theme of the badge */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info']),
  /** Scale options */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Visual presentation style */
  variant: PropTypes.oneOf(['filled', 'outline', 'glass']),
  /** Inline icon to place beside badge text */
  icon: PropTypes.node,
  /** Extra class names */
  className: PropTypes.string,
};

export default Badge;
