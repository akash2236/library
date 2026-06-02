import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Badge, 
  Alert, 
  Input, 
  Modal 
} from '../../components';

import styles from './ProductPage.module.css';

// Import Icons from Lucide React
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Minus, 
  Heart,
  MessageSquare,
  Sparkles,
  Zap,
  Volume2,
  BatteryCharging,
  Smartphone,
  Eye,
  CheckCircle2
} from 'lucide-react';

const headsetProduct = {
  id: 'aero-x1',
  name: 'Aero-X1 Pro Spatial Audio Headset',
  price: 349.99,
  rating: 4.9,
  ratingCount: 148,
  description: 'Unleash absolute sensory dominance. The Aero-X1 Pro merges high-fidelity beryllium drivers with low-latency holographic spatial tracking. Built with space-grade carbon fiber hinges and cooling gel cushions, it represents the absolute pinnacle of acoustic immersion.',
  images: [
    { src: '/headset-main.png', alt: 'Aero-X1 Pro front view on reflective display pedestal' },
    { src: '/headset-detail.png', alt: 'Close-up of Aero-X1 Pro metallic ear cup hinges' },
    { src: '/headset-dock.png', alt: 'Aero-X1 Pro folded on wireless charging case dock' }
  ],
  specs: [
    { name: 'Acoustic Driver', value: '50mm Beryllium Dome' },
    { name: 'Frequency Range', value: '5Hz - 40,000Hz' },
    { name: 'Signal Latency', value: '12ms SuperLink Tech' },
    { name: 'Active Battery', value: '45 Hours (ANC Active)' },
    { name: 'Audio Isolation', value: 'Hybrid ANC (-45dB)' },
    { name: 'Wireless Stream', value: 'v5.4 Bluetooth Dual' }
  ],
  colors: [
    { name: 'Holo Purple', code: '#aa3bff', text: 'Glowing Cyberpunk Violet' },
    { name: 'Stealth Black', code: '#1f2028', text: 'Deep Matte Carbon' },
    { name: 'Ice Aurora', code: '#00d2ff', text: 'Frost Translucent Blue' }
  ],
  sizes: [
    { id: 'standard', name: 'Standard Cushions', desc: '40mm High-density memory foam (Included)' },
    { id: 'xl-cushion', name: 'XL Pro Cushions', desc: '50mm Space-grade cooling gel (+ $15.00)' }
  ],
  initialReviews: [
    { id: 1, author: 'Alex Thorne', date: 'May 28, 2026', rating: 5, content: 'Mind-blowing spatial audio! I can hear steps from exact coordinates in-game. The cooling gel pads are super comfortable for 8-hour sessions.' },
    { id: 2, author: 'Sora Tanaka', date: 'May 20, 2026', rating: 5, content: 'Beautifully designed. The Holo Purple lighting coordinates perfectly with my setup. The 12ms latency is genuinely imperceptible.' },
    { id: 3, author: 'Elena Rostova', date: 'May 14, 2026', rating: 4, content: 'Unbelievable acoustic definition. Mid-tones are pristine and bass is tight without muddying. Only issue is it takes about 2 hours to fully charge.' }
  ]
};

const relatedProducts = [
  { id: 'buds', name: 'Aero-Buds Spatial', price: 149.99, rating: 4.8, img: '/headset-detail.png', badge: 'Best Seller' },
  { id: 'soundbar', name: 'Vortex Soundbar', price: 299.99, rating: 4.7, img: '/headset-dock.png', badge: 'New Arrival' },
  { id: 'case', name: 'Aether Flight Case', price: 79.99, rating: 4.9, img: '/headset-main.png', badge: 'Essential' }
];

const ProductPage = ({ onAddToCart }) => {
  // Gallery Active Image Index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Configuration Choices States
  const [selectedColor, setSelectedColor] = useState(headsetProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(headsetProduct.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  // Reviews Local State (to support adding reviews dynamically)
  const [reviewsList, setReviewsList] = useState(headsetProduct.initialReviews);
  
  // Review Form States
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewError, setNewReviewError] = useState('');

  // Cart Modal / Feedback Trigger
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedRelatedProduct, setSelectedRelatedProduct] = useState(null);

  // Handle Increments safely to prevent negative or zero stock selections
  const handleQuantityIncrement = () => setQuantity(prev => Math.min(prev + 1, 10));
  const handleQuantityDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));

  // Handle Cart Submission
  const handleAddToCartClick = () => {
    onAddToCart(quantity);
    setIsAlertVisible(true);
    // Auto scroll to top to show alert or hide after delay
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsAlertVisible(false), 5000);
  };

  // Submit dynamic client review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim()) {
      setNewReviewError('Please enter your full name.');
      return;
    }
    if (!newReviewContent.trim() || newReviewContent.length < 10) {
      setNewReviewError('Review must contain at least 10 characters.');
      return;
    }

    const addedReview = {
      id: reviewsList.length + 1,
      author: newReviewAuthor,
      date: 'Today',
      rating: Number(newReviewRating),
      content: newReviewContent
    };

    setReviewsList([addedReview, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewContent('');
    setNewReviewRating(5);
    setNewReviewError('');
    alert('Thank you! Your review has been added successfully.');
  };

  // Pricing math adjusting with size cushion option
  const sizeSurcharge = selectedSize.id === 'xl-cushion' ? 15.00 : 0.00;
  const unitPrice = headsetProduct.price + sizeSurcharge;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  return (
    <div className={styles.storePage}>
      
      {/* Dynamic Dismissible Success Alert */}
      {isAlertVisible && (
        <div className={styles.storePage__alertContainer}>
          <Alert 
            type="success" 
            title="Item Added to Cart!"
            message={`Successfully added ${quantity}x ${headsetProduct.name} (${selectedColor.name}, ${selectedSize.name}) to your order list.`}
            onClose={() => setIsAlertVisible(false)}
          />
        </div>
      )}

      {/* Main Grid: Gallery on left/center, Custom purchasing sidebar on right */}
      <div className={styles.storePage__layoutGrid}>
        
        {/* ========================================================
            LEFT COLUMN: GALLERY, DETAILS, SPECS, REVIEWS
            ======================================================== */}
        <div className={styles.storePage__mainContent}>
          
          {/* A. PRODUCT IMAGE GALLERY */}
          <section className={styles.gallery}>
            <div className={styles.gallery__mainWrapper}>
              <Badge color="primary" variant="glass" className={styles.gallery__badge}>
                <Sparkles size={10} style={{marginRight: '4px'}} /> Ultra Spatial
              </Badge>
              <img 
                src={headsetProduct.images[activeImageIndex].src} 
                alt={headsetProduct.images[activeImageIndex].alt} 
                className={styles.gallery__mainImage}
              />
            </div>
            
            <div className={styles.gallery__thumbnails}>
              {headsetProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.gallery__thumbBtn} ${activeImageIndex === idx ? styles['gallery__thumbBtn--active'] : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View thumbnail image ${idx + 1}`}
                >
                  <img src={img.src} alt="" className={styles.gallery__thumbImg} />
                </button>
              ))}
            </div>
          </section>

          {/* B. PRODUCT DETAILS INFO (Price, Title, Rating) */}
          <section className={styles.info}>
            <div className={styles.info__header}>
              <h1 className={styles.info__title}>{headsetProduct.name}</h1>
              <div className={styles.info__ratingsRow}>
                <div className={styles.info__stars} aria-label="Rated 4.9 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < 4 ? styles['info__starIcon--active'] : styles.info__starIcon} 
                    />
                  ))}
                  <span className={styles.info__ratingValue}>{headsetProduct.rating}</span>
                </div>
                <span className={styles.info__reviewsLink}>
                  <MessageSquare size={14} style={{marginRight: '4px'}} /> {reviewsList.length} Verified Reviews
                </span>
              </div>
            </div>

            <div className={styles.info__priceBlock}>
              <span className={styles.info__currentPrice}>${unitPrice.toFixed(2)}</span>
              <Badge color="success" variant="glass" size="sm">Free Courier Shipping</Badge>
            </div>

            <p className={styles.info__description}>{headsetProduct.description}</p>
          </section>

          {/* C. TECHNICAL SPECIFICATIONS (GRID LAYOUT) */}
          <section className={styles.specs}>
            <h2 className={styles.storePage__sectionTitle}>Hardware Specifications</h2>
            <div className={styles.specs__grid}>
              {headsetProduct.specs.map((spec, idx) => (
                <div key={idx} className={styles.specs__card}>
                  <span className={styles.specs__name}>{spec.name}</span>
                  <span className={styles.specs__value}>{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* D. CUSTOMER REVIEWS & FORM SECTION */}
          <section className={styles.reviews}>
            <div className={styles.reviews__header}>
              <h2 className={styles.storePage__sectionTitle}>Acoustic Reviews</h2>
              <Badge color="info" variant="outline">{reviewsList.length} Entries</Badge>
            </div>

            {/* List of Verified Reviews */}
            <div className={styles.reviews__list}>
              {reviewsList.map((review) => (
                <Card 
                  key={review.id} 
                  title={review.author} 
                  subtitle={review.date}
                  variant="glass"
                  className={styles.reviews__card}
                  headerActions={
                    <div className={styles.reviews__stars} aria-label={`${review.rating} stars rating`}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < review.rating ? styles['reviews__starIcon--active'] : styles.reviews__starIcon} 
                        />
                      ))}
                    </div>
                  }
                >
                  <p className={styles.reviews__bodyText}>{review.content}</p>
                </Card>
              ))}
            </div>

            {/* Dynamic Interactive Review Submission Form */}
            <div className={styles.reviews__formWrapper}>
              <Card title="Share Your Experience" subtitle="Reviewing: Aero-X1 Pro Headset" variant="bordered">
                <form onSubmit={handleReviewSubmit} className={styles.reviews__form}>
                  {newReviewError && (
                    <Alert type="error" message={newReviewError} onClose={() => setNewReviewError('')} />
                  )}
                  
                  <div className={styles.reviews__formGrid}>
                    <Input 
                      label="Your Full Name" 
                      placeholder="e.g. John Doe"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                    />
                    
                    <div className={styles.reviews__ratingField}>
                      <label className={styles.reviews__ratingLabel} htmlFor="review-rating-select">
                        Rating Assessment
                      </label>
                      <select 
                        id="review-rating-select"
                        value={newReviewRating} 
                        onChange={(e) => setNewReviewRating(e.target.value)}
                        className={styles.reviews__ratingSelect}
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                        <option value="4">⭐⭐⭐⭐ Highly satisfied (4/5)</option>
                        <option value="3">⭐⭐⭐ Neutral (3/5)</option>
                        <option value="2">⭐⭐ Fair (2/5)</option>
                        <option value="1">⭐ Unsatisfied (1/5)</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.reviews__textField}>
                    <label className={styles.reviews__ratingLabel} htmlFor="review-content-area">
                      Detailed Review Comments
                    </label>
                    <textarea 
                      id="review-content-area"
                      placeholder="What does the bass feel like? How is the latency? Write your details..."
                      value={newReviewContent}
                      onChange={(e) => setNewReviewContent(e.target.value)}
                      className={styles.reviews__textarea}
                      rows={4}
                    />
                  </div>

                  <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '12px'}}>
                    <Button variant="primary" type="submit">Submit My Review</Button>
                  </div>
                </form>
              </Card>
            </div>
          </section>

        </div>

        {/* ========================================================
            RIGHT COLUMN: SIDEBAR SHOP PANEL (PERSISTENT / STICKY)
            ======================================================== */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebar__stickyWrapper}>
            <Card variant="bordered" className={styles.sidebar__card}>
              
              {/* Product mini header */}
              <div className={styles.sidebar__header}>
                <Badge color="primary" variant="glass" size="sm">Available</Badge>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <ShieldCheck size={14} className={styles.sidebar__iconSuccess} />
                  <span style={{fontSize: '12px', color: 'var(--text-muted)'}}>2-Year Warranty</span>
                </div>
              </div>

              {/* 1. COLOR SELECTION PANEL */}
              <div className={styles.configSection}>
                <span className={styles.configSection__label}>
                  Chassis Tone: <span className={styles.configSection__value}>{selectedColor.name}</span>
                </span>
                <div className={styles.configSection__colorRow}>
                  {headsetProduct.colors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.configSection__colorBtn} ${selectedColor.name === color.name ? styles['configSection__colorBtn--active'] : ''}`}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.code }}
                      title={color.text}
                      aria-label={`Select chassis tone: ${color.name}`}
                    />
                  ))}
                </div>
                <p className={styles.configSection__subText}>{selectedColor.text}</p>
              </div>

              {/* 2. SIZE SELECTION PANEL */}
              <div className={styles.configSection}>
                <span className={styles.configSection__label}>
                  Cushion Size: <span className={styles.configSection__value}>{selectedSize.name}</span>
                </span>
                <div className={styles.configSection__sizeColumn}>
                  {headsetProduct.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`${styles.configSection__sizeCard} ${selectedSize.id === size.id ? styles['configSection__sizeCard--active'] : ''}`}
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Select Cushion size: ${size.name}`}
                    >
                      <div className={styles.configSection__sizeMeta}>
                        <span className={styles.configSection__sizeName}>{size.name}</span>
                        <p className={styles.configSection__sizeDesc}>{size.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. QUANTITY & PRICING BAR */}
              <div className={styles.configSection}>
                <span className={styles.configSection__label}>Quantity Selection</span>
                <div className={styles.configSection__quantityRow}>
                  
                  <div className={styles.quantitySelector}>
                    <button 
                      type="button"
                      onClick={handleQuantityDecrement}
                      className={styles.quantitySelector__btn}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.quantitySelector__value}>{quantity}</span>
                    <button 
                      type="button"
                      onClick={handleQuantityIncrement}
                      className={styles.quantitySelector__btn}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className={styles.sidebar__totalPriceBox}>
                    <span style={{fontSize: '11px', color: 'var(--text-muted)'}}>ESTIMATED TOTAL</span>
                    <span className={styles.sidebar__totalValue}>${totalPrice}</span>
                  </div>

                </div>
              </div>

              {/* 4. ACTIONS (ADD TO CART / FAVORITE) */}
              <div className={styles.sidebar__actions}>
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<ShoppingBag size={18} />} 
                  onClick={handleAddToCartClick}
                  className={styles.sidebar__buyBtn}
                >
                  Add to Spatial Cart
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="lg" 
                  icon={<Heart size={18} style={{fill: isFavorite ? 'var(--color-danger)' : 'none', color: isFavorite ? 'var(--color-danger)' : 'currentColor'}} />} 
                  onClick={() => setIsFavorite(prev => !prev)}
                  aria-label="Save to Wishlist"
                />
              </div>

              {/* Assurances badges */}
              <div className={styles.sidebar__assurances}>
                <div className={styles.sidebar__assuranceItem}>
                  <Truck size={14} />
                  <span>Dispatched in 24 hours</span>
                </div>
                <div className={styles.sidebar__assuranceItem}>
                  <RotateCcw size={14} />
                  <span>30-Day Hassle Free Returns</span>
                </div>
              </div>

            </Card>
          </div>
        </aside>

      </div>

      {/* ========================================================
          BOTTOM ROW: RELATED PRODUCTS CARDS (semantic landmarks)
          ======================================================== */}
      <section className={styles.related}>
        <h2 className={styles.storePage__sectionTitle}>Complete Your Setup</h2>
        <div className={styles.related__grid}>
          {relatedProducts.map((prod) => (
            <Card
              key={prod.id}
              title={prod.name}
              subtitle={`Acoustic Accessory`}
              variant="glass"
              interactive
              onClick={() => setSelectedRelatedProduct(prod)}
              className={styles.related__card}
              headerActions={<Badge color="primary" size="sm">{prod.badge}</Badge>}
              footer={
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{fontWeight: '700', color: 'var(--text-main)'}}>${prod.price}</span>
                  <Button variant="ghost" size="sm" icon={<Eye size={12} />}>View Details</Button>
                </div>
              }
            >
              <div style={{height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-app)', marginBottom: '8px', border: '1px solid var(--border-light)'}}>
                <img src={prod.img} alt={prod.name} style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'brightness(1.1)'}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-warning)'}}>
                <Star size={12} style={{fill: 'currentColor'}} />
                <span>{prod.rating} rating score</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Related Product Details Modal */}
      {selectedRelatedProduct && (
        <Modal
          isOpen={!!selectedRelatedProduct}
          title={selectedRelatedProduct.name}
          onClose={() => setSelectedRelatedProduct(null)}
          size="md"
          footer={
            <>
              <Button variant="ghost" onClick={() => setSelectedRelatedProduct(null)}>Close</Button>
              <Button variant="primary" icon={<ShoppingBag size={14} />} onClick={() => { onAddToCart(1); setSelectedRelatedProduct(null); alert(`${selectedRelatedProduct.name} added.`); }}>
                Quick Buy (${selectedRelatedProduct.price})
              </Button>
            </>
          }
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-light)'}}>
              <img src={selectedRelatedProduct.img} alt={selectedRelatedProduct.name} style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}} />
            </div>
            <Alert type="info" message={`This accessories item coordinates perfectly with the Aero-X1 Pro Headset, syncing colors and LED glow schemes automatically.`} />
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.6'}}>
              Upgrade your environment. The space-grade build provides structural reliability, premium ergonomics, and direct low-latency sync loops with the primary H-1 audio core.
            </p>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default ProductPage;
