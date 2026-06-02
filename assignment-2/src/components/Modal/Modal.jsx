import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './module.module.css';
import { X } from 'lucide-react';

/**
 * Modal Component - A premium overlay dialog for focused user actions.
 * Uses BEM naming convention combined with CSS Modules for clean scoping.
 * Uses React Portal to render safely in the document body.
 *
 * Why: Standard modals feel stiff and blocky. We implement smooth backdrop blurring,
 * 3D scale expansions, active focus-trapping for keyboard accessibility,
 * ESC key bindings, and highly customizable sizing.
 */
const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);
  const triggerElementRef = useRef(null);

  // Store the element that triggered the modal to restore focus afterwards
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement;
    }
  }, [isOpen]);

  // Trap focus and handle keydown (ESC key)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // 1. Close on ESC key
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
        return;
      }

      // 2. Trapping Focus (Tab Loop)
      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
        );

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Backward tab loop
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Forward tab loop
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Auto-focus the modal container or the close button when opened
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector('button, input, [tabindex="0"]');
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    // Disable background page scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = '';
      
      // Restore focus to original trigger button when modal is unmounted/closed
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, closeOnEsc]);

  // If not open, render nothing
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Make sure we clicked on the background overlay and not inside the dialog
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Compose BEM classes
  const sizeClass = styles[`modal__dialog--${size}`] || styles['modal__dialog--md'];
  const composedDialogClasses = `${styles.modal__dialog} ${sizeClass} ${className}`.trim();

  // Create Portal to append modal directly under document body to bypass CSS overflow restrictions
  return createPortal(
    <div 
      className={styles.modal} 
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className={composedDialogClasses} 
        tabIndex="-1"
        {...props}
      >
        <div className={styles.modal__header}>
          <h3 id="modal-title" className={styles.modal__title}>
            {title}
          </h3>
          <button 
            type="button" 
            className={styles.modal__close} 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.modal__body}>
          {children}
        </div>

        {footer && (
          <div className={styles.modal__footer}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  /** Visibility state of the modal overlay */
  isOpen: PropTypes.bool.isRequired,
  /** Heading text displayed in the header row */
  title: PropTypes.string.isRequired,
  /** Contents of the modal dialog body */
  children: PropTypes.node.isRequired,
  /** Dismiss callback triggered by clicking close, overlay, or pressing ESC */
  onClose: PropTypes.func.isRequired,
  /** Row of interactive buttons or text inside footer section */
  footer: PropTypes.node,
  /** Maximum width layout options */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  /** Clicking the dark backdrop background triggers onClose */
  closeOnOverlayClick: PropTypes.bool,
  /** Pressing the ESC key triggers onClose */
  closeOnEsc: PropTypes.bool,
  /** Extra class names */
  className: PropTypes.string,
};

export default Modal;
