import React, { useState, useEffect } from 'react';
import ProductPage from './pages/ProductPage/ProductPage';
import { Button, Badge, Modal, Alert } from './components';

// Import CSS Layouts
import './App.css';

// Import Icons from Lucide
import { 
  Sparkles, 
  Sun, 
  Moon, 
  ShoppingBag, 
  ExternalLink,
  Lock,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

function App() {
  // Theme Toggle States
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Cart Management States
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);

  // Effect to sync light-theme class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Handle addition of items to cart
  const handleAddToCart = (quantity) => {
    setCartCount(prev => prev + quantity);
    
    // Add item detail to list
    const newItem = {
      id: Date.now(),
      name: 'Aero-X1 Pro Spatial Audio Headset',
      qty: quantity,
      price: 349.99
    };
    
    setCartItems(prev => [newItem, ...prev]);
    setHasCheckedOut(false);
  };

  // Trigger checkout simulated response
  const handleCheckoutSubmit = () => {
    setCartItems([]);
    setCartCount(0);
    setHasCheckedOut(true);
  };

  // Calculate sum subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);
  };

  return (
    <div className="app">
      {/* Dynamic Backgrounds */}
      <div className="bg-grid-glow"></div>
      <div className="bg-orb-purple"></div>

      {/* Brand Navigation Header */}
      <header className="header">
        <nav className="header__nav" aria-label="Primary Navigation">
          
          <a href="#" className="header__logo">
            <div className="header__logoDot"></div>
            <span>AERO SOUND</span>
          </a>

          <div className="header__links">
            <a href="#acoustics" className="header__link">Acoustics</a>
            <a href="#holographic" className="header__link">Spatial Hub</a>
            <a href="#specs" className="header__link">Tech Specs</a>
            <a href="#reviews" className="header__link">Verified Reviews</a>
          </div>

          <div className="header__controls">
            
            {/* Theme Toggle Button */}
            <Button 
              variant="ghost" 
              onClick={() => setIsDarkMode(prev => !prev)}
              aria-label="Toggle theme mode"
              icon={isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            />

            {/* Shopping Bag Button with Badge */}
            <div className="cartBtn">
              <Button 
                variant="secondary" 
                icon={<ShoppingBag size={18} />} 
                onClick={() => setIsCartModalOpen(true)}
                aria-label="Open shopping cart"
              >
                Cart
              </Button>
              {cartCount > 0 && (
                <div className="cartBtn__badge">
                  <Badge color="primary" variant="filled" size="sm">
                    {cartCount}
                  </Badge>
                </div>
              )}
            </div>

          </div>
        </nav>
      </header>

      {/* Main E-Commerce Grid Surface */}
      <main className="mainStore">
        <ProductPage onAddToCart={handleAddToCart} />
      </main>

      {/* Brand Footer */}
      <footer className="footer">
        <div className="footer__content">
          <span className="footer__copyright">
            © 2026 Aero Sound Labs Inc. All rights reserved. Built using modular React Components.
          </span>
          <div className="footer__links">
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Terms of Service</a>
            <a href="#" className="footer__link">Technical Support</a>
          </div>
        </div>
      </footer>

      {/* ========================================================
          CART SIDE-DIALOG MODAL
          ======================================================== */}
      <Modal
        isOpen={isCartModalOpen}
        title="Your Spatial Audio Cart"
        onClose={() => setIsCartModalOpen(false)}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsCartModalOpen(false)}>Continue Browsing</Button>
            {cartItems.length > 0 && (
              <Button 
                variant="primary" 
                icon={<Lock size={14} />} 
                onClick={handleCheckoutSubmit}
              >
                Secure Checkout (${calculateSubtotal()})
              </Button>
            )}
          </>
        }
      >
        <div className="cartList">
          {hasCheckedOut && (
            <Alert 
              type="success" 
              title="Secure Checkout Succeeded!"
              message="Your spatial audio transaction has been processed in 8ms. We have sent the invoice receipts and courier tracking credentials to your verified mail address."
            />
          )}

          {cartItems.length === 0 ? (
            <div className="cartList__empty">
              {!hasCheckedOut && (
                <>
                  <ShoppingBag size={48} style={{opacity: 0.25, marginBottom: '12px'}} />
                  <p>Your spatial bag is currently empty.</p>
                  <p style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px'}}>
                    Configure the options on the Aero-X1 Pro to load immersive items.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <Alert type="info" message="Congrats! Your order is eligible for immediate express courier delivery at no supplementary surcharges." />
              
              {cartItems.map((item) => (
                <div key={item.id} className="cartList__item">
                  <div className="cartList__meta">
                    <span className="cartList__name">{item.name}</span>
                    <span className="cartList__desc">
                      Quantity: <strong>{item.qty}</strong> units
                    </span>
                  </div>
                  <span className="cartList__price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}

              <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px 4px 4px', 
                borderTop: '1px dashed var(--border-light)',
                marginTop: '8px'
              }}>
                <span style={{fontWeight: '600', color: 'var(--text-secondary)'}}>Aggregate Subtotal:</span>
                <span style={{
                  fontSize: '1.25rem', 
                  fontWeight: '800', 
                  color: 'var(--text-main)', 
                  fontFamily: 'var(--font-display)'
                }}>
                  ${calculateSubtotal()}
                </span>
              </div>
            </>
          )}
        </div>
      </Modal>

    </div>
  );
}

export default App;
