import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './module.module.css';

// Importing icons from Lucide for automatic beautiful type indicators
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  X 
} from 'lucide-react';

/**
 * Alert Component - A beautiful system message alert banner.
 * Uses BEM naming convention combined with CSS Modules for clean scoping.
 *
 * Why: Standard alerts are static panels. We implement elegant sliding entry
 * animations, matching high-end Lucide icons, accessible close handlers, and
 * glow backdrops that look amazing in any notification stack.
 */
const Alert = React.forwardRef(({
  type = 'info',
  message,
  children,
  title,
  onClose,
  icon,
  className = '',
  ...props
}, ref) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const content = message || children;

  // Select matching Lucide icon based on alert variant type
  const getIcon = () => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return <CheckCircle2 className={styles.alert__typeIcon} size={20} />;
      case 'warning':
        return <AlertTriangle className={styles.alert__typeIcon} size={20} />;
      case 'error':
        return <XCircle className={styles.alert__typeIcon} size={20} />;
      case 'info':
      default:
        return <Info className={styles.alert__typeIcon} size={20} />;
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onClose) {
      // Delay onClose call briefly to allow transition fade-out to complete
      setTimeout(onClose, 250);
    }
  };

  if (isDismissed) return null;

  // BEM class composing
  const typeClass = styles[`alert--${type}`] || styles['alert--info'];
  const composedClasses = `${styles.alert} ${typeClass} ${className}`.trim();

  return (
    <div
      ref={ref}
      className={composedClasses}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      <div className={styles.alert__iconContainer} aria-hidden="true">
        {getIcon()}
      </div>
      
      <div className={styles.alert__content}>
        {title && <h4 className={styles.alert__title}>{title}</h4>}
        <div className={styles.alert__message}>{content}</div>
      </div>
      
      {onClose && (
        <button
          type="button"
          className={styles.alert__close}
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

Alert.propTypes = {
  /** The alert message variant */
  type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  /** Primary message content (can also be passed as children) */
  message: PropTypes.node,
  /** Optional secondary details content */
  children: PropTypes.node,
  /** Optional header title for the alert */
  title: PropTypes.string,
  /** Callback triggered when clicking the dismiss button */
  onClose: PropTypes.func,
  /** Custom leading graphic/icon override */
  icon: PropTypes.node,
  /** Extra class names */
  className: PropTypes.string,
};

export default Alert;
