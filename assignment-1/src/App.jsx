import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Alert, 
  Modal 
} from './components';

// Import Custom App Styling
import './App.css';

// Import Icons from Lucide React
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Layers, 
  Square, 
  AlertOctagon, 
  Eye, 
  Mail, 
  Search, 
  Play, 
  Settings, 
  Plus, 
  Minus, 
  Heart,
  MessageCircle,
  HelpCircle,
  Share2,
  Trash2,
  CheckCircle2
} from 'lucide-react';

function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Input states
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Interactive Card Counter
  const [likesCount, setLikesCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  // Active Alerts visibility
  const [alertSuccess, setAlertSuccess] = useState(true);
  const [alertWarning, setAlertWarning] = useState(true);
  const [alertError, setAlertError] = useState(true);

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'sm', 'md', 'lg', 'full'

  // Effect to sync dark/light class with document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Handle email validation in real time
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (!val) {
      setEmailError('');
    } else if (!/\S+@\S+\.\S+/.test(val)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Decorative Orbs */}
      <div className="bg-grid-glow"></div>
      <div className="bg-orb-purple"></div>
      <div className="bg-orb-blue"></div>
      <div className="glass-glow-orb orb-top-left"></div>
      <div className="glass-glow-orb orb-bottom-right"></div>

      {/* Header Banner */}
      <header className="app-header">
        <div className="app-header__badge-wrapper">
          <Badge color="primary" variant="glass" icon={<Sparkles size={12} />} size="md">
            Component Library Suite
          </Badge>
        </div>
        <h1 className="app-header__title">Extraordinary Component Library</h1>
        <p className="app-header__subtitle">
          Assignment 1: A premium, highly composable, and accessible set of React components styled using CSS Modules and BEM methodology.
        </p>
        <div className="app-header__controls">
          <Button 
            variant="secondary" 
            onClick={() => setIsDarkMode(prev => !prev)}
            icon={isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          >
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </div>
      </header>

      {/* Grid of Component Showcase Cards */}
      <main className="showcase-grid">
        
        {/* SECTION 1: BUTTONS */}
        <section className="showcase-section">
          <Card 
            title="1. Button Showcase" 
            subtitle="props: variant, size, disabled, onClick, icon"
            variant="default"
            className="section-card"
          >
            <p className="section-desc">
              High-performance interactive buttons with custom micro-animations, neon focus loops, and spring tactile feedback on click.
            </p>

            <h4 className="demo-title-sub">Variants</h4>
            <div className="demo-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <h4 className="demo-title-sub">Intent Colors</h4>
            <div className="demo-row">
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
            </div>

            <h4 className="demo-title-sub">Sizes & Icons</h4>
            <div className="demo-row">
              <Button variant="primary" size="sm" icon={<Plus size={14} />}>Small</Button>
              <Button variant="primary" size="md" icon={<Settings size={16} />}>Medium</Button>
              <Button variant="primary" size="lg" icon={<Play size={18} />} iconPosition="right">Large</Button>
            </div>

            <h4 className="demo-title-sub">Interactive States</h4>
            <div className="demo-row">
              <Button variant="primary" disabled icon={<Trash2 size={16} />}>Disabled State</Button>
              <Button variant="outline" onClick={() => alert('Button Clicked!')}>Click Me</Button>
            </div>
          </Card>
        </section>

        {/* SECTION 2: INPUTS & FLOATING LABELS */}
        <section className="showcase-section">
          <Card 
            title="2. Text Input Showcase" 
            subtitle="props: label, placeholder, type, error, helperText, icon, onChange"
            variant="default"
            className="section-card"
          >
            <p className="section-desc">
              Highly accessible fields linked with screen-reader labels, inline icon support, error indicators, and wobble keyframe responses.
            </p>

            <div className="demo-column">
              <Input 
                label="Full Name" 
                placeholder="Enter your name..." 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)}
                helperText="How should we address you?"
                icon={<Sparkles size={16} />}
              />

              <Input 
                label="Email Address" 
                placeholder="you@domain.com" 
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                icon={<Mail size={16} />}
              />

              <Input 
                label="Secret Key" 
                placeholder="Cannot edit this..." 
                value="NEON-7848-SHINE"
                disabled
              />
            </div>

            <h4 className="demo-title-sub">Live Value Bindings</h4>
            <div className="state-viewer">
              Name: <span>{userName || 'Empty'}</span> <br />
              Email Valid: <span>{email ? (emailError ? '❌ Invalid' : '✅ Valid') : 'No Input'}</span>
            </div>
          </Card>
        </section>

        {/* SECTION 3: BADGES */}
        <section className="showcase-section">
          <Card 
            title="3. Badge System" 
            subtitle="props: text, color, size, variant, icon"
            variant="default"
            className="section-card"
          >
            <p className="section-desc">
              Compact visual indicators supporting deep backgrounds, thin high-contrast outlines, and sleek glassmorphic blur glows.
            </p>

            <h4 className="demo-title-sub">Glassmorphic Variant (Default)</h4>
            <div className="demo-row">
              <Badge color="primary" variant="glass">Primary</Badge>
              <Badge color="secondary" variant="glass">Secondary</Badge>
              <Badge color="success" variant="glass">Success</Badge>
              <Badge color="warning" variant="glass">Warning</Badge>
              <Badge color="danger" variant="glass">Danger</Badge>
              <Badge color="info" variant="glass">Info</Badge>
            </div>

            <h4 className="demo-title-sub">Filled Solid Variant</h4>
            <div className="demo-row">
              <Badge color="primary" variant="filled">Filled</Badge>
              <Badge color="success" variant="filled">Active</Badge>
              <Badge color="danger" variant="filled">Critical</Badge>
              <Badge color="warning" variant="filled">Pending</Badge>
            </div>

            <h4 className="demo-title-sub">Outline High-Contrast Variant</h4>
            <div className="demo-row">
              <Badge color="primary" variant="outline">Outline</Badge>
              <Badge color="success" variant="outline">Approved</Badge>
              <Badge color="danger" variant="outline">Rejected</Badge>
              <Badge color="info" variant="outline">Syncing</Badge>
            </div>

            <h4 className="demo-title-sub">Sizes & Icons</h4>
            <div className="demo-row">
              <Badge color="success" size="sm" variant="glass" icon={<CheckCircle2 size={10} />}>Small</Badge>
              <Badge color="primary" size="md" variant="glass" icon={<Sparkles size={12} />}>Medium</Badge>
              <Badge color="danger" size="lg" variant="glass" icon={<AlertOctagon size={14} />}>Large Status</Badge>
            </div>
          </Card>
        </section>

        {/* SECTION 4: SYSTEM ALERTS */}
        <section className="showcase-section">
          <Card 
            title="4. Notification Alerts" 
            subtitle="props: type, message, title, onClose, icon"
            variant="default"
            className="section-card"
          >
            <p className="section-desc">
              Dismissible dynamic message banners with slide-in entrance animations, overlay border neon tones, and automatic icon mappings.
            </p>

            <div className="demo-column">
              {alertSuccess ? (
                <Alert 
                  type="success" 
                  title="Database Connected Successfully" 
                  message="System state has synchronized successfully with remote shards in 14ms." 
                  onClose={() => setAlertSuccess(false)}
                />
              ) : (
                <Button variant="outline" size="sm" onClick={() => setAlertSuccess(true)}>Reset Success Alert</Button>
              )}

              {alertWarning ? (
                <Alert 
                  type="warning" 
                  title="Performance Degradation Warning" 
                  message="Server responding under heavy loads. Queries taking longer than 200ms." 
                  onClose={() => setAlertWarning(false)}
                />
              ) : (
                <Button variant="outline" size="sm" onClick={() => setAlertWarning(true)}>Reset Warning Alert</Button>
              )}

              {alertError ? (
                <Alert 
                  type="error" 
                  title="Fatal Database Query Exception" 
                  message="Failed to write transaction records due to unique constraint violation." 
                  onClose={() => setAlertError(false)}
                />
              ) : (
                <Button variant="outline" size="sm" onClick={() => setAlertError(true)}>Reset Error Alert</Button>
              )}
            </div>
          </Card>
        </section>

        {/* SECTION 5: MODULAR CARDS */}
        <section className="showcase-section">
          <Card 
            title="5. Card Surfaces" 
            subtitle="props: title, subtitle, footer, headerActions, variant, interactive"
            variant="default"
            className="section-card"
          >
            <p className="section-desc">
              Organized surface layers supporting default drop shadows, frosted glass blur, glowing gradients, and mouse hover scales.
            </p>

            <div className="demo-column">
              {/* Glass Card */}
              <Card 
                title="Glassmorphism Card" 
                subtitle="variant='glass'" 
                variant="glass"
                headerActions={<Badge color="info">Modern</Badge>}
              >
                Frosted glass surfaces look incredible over glowing backgrounds. This card uses standard backdrop blurs combined with thin border lines.
              </Card>

              {/* Gradient Border Card */}
              <Card 
                title="Neon Accent Border Card" 
                subtitle="variant='bordered'" 
                variant="bordered"
                footer={<span style={{fontSize: '12px', color: 'var(--text-muted)'}}>Active Channel Code</span>}
              >
                Perfect for highlighting high priority features or premium sections with neon-gradient borders at the top edge.
              </Card>

              {/* Interactive Card */}
              <Card 
                title="Interactive Clickable Card" 
                subtitle="interactive={true}" 
                variant="default" 
                interactive
                onClick={handleLikeToggle}
                footer={
                  <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: '12px', color: 'var(--text-muted)'}}>Click anywhere to interact</span>
                    <Button variant="ghost" size="sm" icon={<Heart size={14} style={{fill: isLiked ? 'var(--color-danger)' : 'none', color: isLiked ? 'var(--color-danger)' : 'currentColor'}} />}>
                      {likesCount} Likes
                    </Button>
                  </div>
                }
              >
                Hovering over this card lifts the container and glows the border! Perfect for related product links or click-sensitive actions.
              </Card>
            </div>
          </Card>
        </section>

        {/* SECTION 6: DIALOG MODALS */}
        <section className="showcase-section">
          <Card 
            title="6. Dialog Modal Overlays" 
            subtitle="props: isOpen, title, onClose, footer, size, closeOnOverlayClick"
            variant="default"
            className="section-card"
          >
            <p className="section-desc">
              Overlay alert boxes utilizing React Portals, complete page scrolling locks, keyboard focus traps, and ESC shortcut actions.
            </p>

            <div className="demo-column">
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <Button variant="primary" size="lg" icon={<Eye size={18} />} onClick={() => setActiveModal('md')}>
                  Launch Medium Modal (Demo)
                </Button>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
                  <Button variant="secondary" size="sm" onClick={() => setActiveModal('sm')}>Small Modal</Button>
                  <Button variant="secondary" size="sm" onClick={() => setActiveModal('lg')}>Large Modal</Button>
                  <Button variant="secondary" size="sm" onClick={() => setActiveModal('full')}>Full Screen</Button>
                </div>
              </div>

              <div className="state-viewer">
                Active Overlay: <span>{activeModal ? `Active (${activeModal.toUpperCase()})` : 'Closed'}</span>
              </div>
            </div>
          </Card>
        </section>

      </main>

      {/* ========================================================
          MODAL DECLARATIONS (Rendered via React Portal under body)
          ======================================================== */}
      
      {/* 1. Small Modal */}
      <Modal
        isOpen={activeModal === 'sm'}
        title="Confirm Account Deletion"
        onClose={() => setActiveModal(null)}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { alert('Account deleted.'); setActiveModal(null); }}>Delete Permanently</Button>
          </>
        }
      >
        <p style={{color: 'var(--text-secondary)'}}>
          Are you absolutely sure you want to delete your account? This action is <strong>irreversible</strong> and will delete all project data.
        </p>
      </Modal>

      {/* 2. Medium Modal (Standard Demo) */}
      <Modal
        isOpen={activeModal === 'md'}
        title="Settings & System Preferences"
        onClose={() => setActiveModal(null)}
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setActiveModal(null)}>Discard</Button>
            <Button variant="primary" onClick={() => { alert('Settings saved.'); setActiveModal(null); }}>Save Changes</Button>
          </>
        }
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <Alert type="info" message="Modals automatically trap keyboard focus! Try using TAB or SHIFT+TAB to navigate inside this dialog." />
          <Input 
            label="Workspace Domain" 
            value="my-extraordinary-app" 
            helperText="Custom staging environment address"
            icon={<Search size={16} />}
          />
          <Input 
            label="Support Notifications Address" 
            placeholder="support@domain.com"
            icon={<Mail size={16} />}
          />
          <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
            <span style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-main)'}}>Sync with hardware:</span>
            <Badge color="success" variant="glass">Active Radar</Badge>
          </div>
        </div>
      </Modal>

      {/* 3. Large Modal */}
      <Modal
        isOpen={activeModal === 'lg'}
        title="Privacy & Service Terms Agreement"
        onClose={() => setActiveModal(null)}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setActiveModal(null)}>Reject</Button>
            <Button variant="primary" onClick={() => { alert('Accepted terms.'); setActiveModal(null); }}>Accept & Continue</Button>
          </>
        }
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)'}}>
          <h4 style={{color: 'var(--text-main)'}}>1. Intellectual Property Rights</h4>
          <p>
            All text, graphics, logos, and custom layout components displayed across this application are owned exclusively by our system under regional copyright legislation.
          </p>
          <h4 style={{color: 'var(--text-main)'}}>2. Permitted Commercial Use</h4>
          <p>
            Subject to complete compliance with these terms, you are granted a non-transferable, revocable license to adapt the Component Library into custom web projects.
          </p>
          <h4 style={{color: 'var(--text-main)'}}>3. Focus and Scope Trapping</h4>
          <p>
            This portal ensures modals remain on the absolute top layer of the DOM. Standard HTML pages wrapping this dialog remain protected under custom backdrops.
          </p>
        </div>
      </Modal>

      {/* 4. Full Screen Modal */}
      <Modal
        isOpen={activeModal === 'full'}
        title="Creative Dashboard Overview (Full-Screen Preview)"
        onClose={() => setActiveModal(null)}
        size="full"
        footer={<Button variant="primary" onClick={() => setActiveModal(null)}>Return to Dashboard</Button>}
      >
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px', height: '100%'}}>
          <Alert type="success" title="Fullscreen Environment Active" message="All panels have been zoomed to scale. Ideal for presentation modes." />
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
            <Card title="Database Health" subtitle="Live Shards" variant="bordered">
              <h2 style={{color: 'var(--color-success)'}}>99.98%</h2>
              <p style={{fontSize: '12px'}}>All read/write paths operational</p>
            </Card>
            <Card title="Traffic Index" subtitle="Hits / minute" variant="default">
              <h2 style={{color: 'var(--color-primary)'}}>12.4k</h2>
              <p style={{fontSize: '12px'}}>12% increase since last hour</p>
            </Card>
            <Card title="Incident Reports" subtitle="Unassigned items" variant="glass">
              <h2 style={{color: 'var(--color-warning)'}}>0</h2>
              <p style={{fontSize: '12px'}}>Outstanding errors resolved</p>
            </Card>
          </div>

          <Card title="Library System Statistics" subtitle="Weekly Performance Charts">
            <p>
              By leveraging CSS Modules, our styling maps directly to local scopes, preventing class contamination across assignments. This keeps Assignment 1 and Assignment 2 fully decoupled while maintaining structural consistency.
            </p>
          </Card>
        </div>
      </Modal>
    </div>
  );
}

export default App;
