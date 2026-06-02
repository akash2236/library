import React from 'react';
import PropTypes from 'prop-types';
import styles from './module.module.css';

/**
 * Card Component - A elegant surface component for organizing content.
 * Uses BEM naming convention combined with CSS Modules for clean scoping.
 *
 * Why: Standard cards lack texture. We implement depth layers, elegant
 * glassmorphic backdrops, smooth border gradients, and interactive hover lifts.
 */
const Card = React.forwardRef(({
  title,
  subtitle,
  children,
  footer,
  headerActions,
  variant = 'default',
  interactive = false,
  onClick,
  className = '',
  ...props
}, ref) => {
  
  // Choose BEM modifiers based on variant and interactive settings
  const variantClass = styles[`card--${variant}`] || styles['card--default'];
  const interactiveClass = interactive ? styles['card--interactive'] : '';
  
  const composedClasses = `${styles.card} ${variantClass} ${interactiveClass} ${className}`.trim();

  // Handle keyboard events when card is interactive
  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      ref={ref}
      className={composedClasses}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {(title || subtitle || headerActions) && (
        <div className={styles.card__header}>
          <div className={styles.card__headerGroup}>
            {title && <h3 className={styles.card__title}>{title}</h3>}
            {subtitle && <p className={styles.card__subtitle}>{subtitle}</p>}
          </div>
          {headerActions && (
            <div className={styles.card__actions} onClick={(e) => e.stopPropagation()}>
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className={styles.card__body}>
        {children}
      </div>
      
      {footer && (
        <div className={styles.card__footer} onClick={(e) => e.stopPropagation()}>
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  /** The main title of the card */
  title: PropTypes.node,
  /** An optional subtitle displayed below the title */
  subtitle: PropTypes.node,
  /** The core content of the card */
  children: PropTypes.node.isRequired,
  /** Optional element/text to display in the bottom footer row */
  footer: PropTypes.node,
  /** Optional interactive elements to place on the right side of the card header */
  headerActions: PropTypes.node,
  /** Visual variation of the card surface */
  variant: PropTypes.oneOf(['default', 'glass', 'flat', 'bordered']),
  /** Whether the card should show hover lifting and tap actions */
  interactive: PropTypes.bool,
  /** Click event handler (forces interactive to true if supplied) */
  onClick: PropTypes.func,
  /** Extra class names */
  className: PropTypes.string,
};

export default Card;
