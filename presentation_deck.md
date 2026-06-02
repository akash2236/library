---
marp: true
theme: uncover
class: invert
paginate: true
backgroundColor: #0c0c0e
color: #f1f1f3
style: |
  section {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    padding: 40px;
    text-align: left;
  }
  h1, h2 {
    font-family: 'Space Grotesk', sans-serif;
    color: #aa3bff;
  }
  h2 {
    border-bottom: 2px solid #aa3bff;
    padding-bottom: 8px;
  }
  footer {
    font-size: 0.5em;
    color: #71717a;
  }
  code {
    background-color: #1f2028;
    color: #00d2ff;
  }
  .highlight {
    color: #00d2ff;
    font-weight: bold;
  }
  .badge {
    background-color: rgba(170, 59, 255, 0.2);
    color: #aa3bff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8em;
  }
---

# Premium React Assignment Suite
## Technical Presentation Deck & Developer Documentation

**Workspace Directory:** `market/`
**Target Repos:** `https://github.com/akash2236/library.git`
**Author:** AI Pair Programmer
**Date:** June 2026

*A state-of-the-art overview of the Component Library (Assignment 1) and the Responsive Cyberpunk E-Commerce Storefront (Assignment 2).*

---

## Slide 2: Executive Summary & Goals

### Project Objectives
*   **Assignment 1 (Component Library):** Design a set of reusable, isolated, and highly configurable React components. Enforce strict BEM style scoping using CSS Modules and integrate complete ARIA web accessibility.
*   **Assignment 2 (E-Commerce Storefront):** Implement a fully responsive, visually excellent single-product detail page. Achieve **100% DRY (Don't Repeat Yourself)** structure by reusing the exact components built in Assignment 1.

### UI Brand Mandate
*   Create a premium, dark-mode first design using custom Google Fonts (Plus Jakarta Sans & Space Grotesk).
*   Combine glowing HSL color tokens with glassmorphic layers and smooth micro-animations.

---

## Slide 3: Unified Project Architecture

```text
market/
├── README.md                          # Master documentation guide
├── presentation_deck.md               # PowerPoint Presentation (This deck)
├── .gitignore                         # Excludes node_modules/ & dist/ from Git
│
├── assignment-1/                      # Project 1: Component Library Suite
│   ├── src/
│   │   ├── components/                # Self-contained visual widgets
│   │   │   ├── Button/ Card/ Input/ Badge/ Alert/ Modal/
│   │   │   └── index.js               # Library exports index aggregator
│   │   ├── App.jsx / App.css          # Interactive components demo card deck
│   │   └── index.css                  # Google Fonts & master HSL design system
│
└── assignment-2/                      # Project 2: Immersive E-Commerce Page
    ├── public/                        # High-fidelity static product mockups
    ├── src/
    │   ├── components/                # Replicated DRY components library
    │   ├── pages/ProductPage/         # Product view logic and BEM grids
    │   └── App.jsx / App.css          # Cart global states & checkout overlays
```

---

## Slide 4: Brand Token Architecture (`index.css`)

Both projects share a cohesive HSL-mapped dark design system allowing straightforward visual maintenance and extreme brand alignment.

*   **Midnight Base Background:** `hsl(240, 10%, 4%)` — High-end dark ambient background.
*   **Card Surface Layer:** `hsl(240, 10%, 8%)` — Solid surface container overlay.
*   **Brand Primary Accent:** `hsl(262, 85%, 60%)` — Royal glowing cyberpunk violet.
*   **Courier Shipping Accent:** `hsl(142, 75%, 45%)` — Emerald green (success states).
*   **Interactive Amber Star:** `hsl(38, 85%, 50%)` — Gold (star reviews & warning states).
*   **Borders & Outlines:** `hsla(240, 10%, 20%, 0.8)` — Semi-translucent glass limits.
*   **Tactile Shadows:**
    *   `--shadow-md`: Soft drop shadows under cards.
    *   `--shadow-lg`: Deep high-contrast modal backdrops.

---

## Slide 5: Components Specifications (1/3)

### 1. `Button` Component
*   **Configurable Props:** `variant` (primary, secondary, outline, ghost, danger), `size` (sm, md, lg), `icon` (prefix graphic), `disabled`.
*   **BEM Styling:** `.btn`, `.btn--primary`, `.btn--disabled`, `.btn__icon`.
*   **Micro-Animation:** Tactical click compression (`scale(0.97)`) on mouse tap for responsive physical feedback.

### 2. `Card` Component
*   **Configurable Props:** `title`, `subtitle`, `footer` slot, `headerActions` slot, `variant` (default, glass, flat, bordered), `interactive` toggle.
*   **BEM Styling:** `.card`, `.card--glass`, `.card--interactive`, `.card__footer`.
*   **Micro-Animation:** Hover lift (`translateY(-4px)`) and radial outer glow expansion.

---

## Slide 6: Components Specifications (2/3)

### 3. `Input` Component
*   **Configurable Props:** `label`, `placeholder`, `type`, `error` (triggers red border alert), `helperText`, `icon` prefix, `disabled`, `required`.
*   **BEM Styling:** `.input-group`, `.input-group--error`, `.input-group__field`, `.input-group__icon`.
*   **Micro-Animation:** Custom horizontal CSS keyframe wobble (`@keyframes wobble`) shakes the text container on validation errors to draw the user's focus.

### 7. `Badge` Component
*   **Configurable Props:** `text`, `color` (primary, secondary, success, warning, danger, info), `size` (sm, md, lg), `variant` (filled, outline, glass), `icon` prefix.
*   **BEM Styling:** `.badge`, `.badge--sm`, `.badge--glass`, `.badge__icon`.
*   **Design Highlight:** Frosted glass variants overlay HSL backdrops with border gradients.

---

## Slide 7: Components Specifications (3/3)

### 5. `Alert` Component
*   **Configurable Props:** `type` (success, warning, error, info), `title`, `message` body, `onClose` callback, `icon` override.
*   **A11y Role:** Triggers automatic screen-reader live announcement bindings (`role="alert"`, `aria-live="assertive"`).
*   **BEM Styling:** `.alert`, `.alert--success`, `.alert__close`.

### 6. `Modal` Component
*   **Configurable Props:** `isOpen`, `title`, `onClose` callback, `footer` slot, `size` (sm, md, lg, xl, full), `closeOnOverlayClick`, `closeOnEsc`.
*   **A11y Mechanics:**
    1.  Tabbing loops strictly inside the portal container (Focus Trap).
    2.  Pressing `ESC` closes the dialog; focus returns to the initiating trigger.
    3.  Locks page background scrolling (`overflow: hidden` on DOM body).

---

## Slide 8: E-Commerce Storefront: Responsive Layouts

The E-Commerce Single Product Detail Page (`assignment-2`) maps a **mobile-first** responsive styling grid:

### 📱 1. Mobile Portrait Viewport (`< 640px`)
*   Single vertical column stacked configuration.
*   The primary product gallery spans 100% width, followed by titles, details, sticky specs cards, reviews list, related accessories, and footers.

### 📟 2. Tablet Viewport (`640px - 1024px`)
*   Split two-column grid. Gallery and tech descriptions take the left area; the configuration buying sidebar fits on the right.

### 💻 3. Desktop Viewport (`>= 1024px`)
*   Optimized column layouts. The primary gallery and product review blocks align on the left. The buying configuration sidebar card locks in a **sticky top layout** (`position: sticky`, `top: 40px`) on the right.

---

## Slide 9: E-Commerce Storefront: Interactive State Engine

### 1. Main Gallery state machinery
*   Maintains the index of the actively displayed product asset. Clicking gallery thumbnail buttons immediately shifts the source target with fading transitions.

### 2. Live Pricing Calculation
*   Calculates estimations depending on the selected size (XL Cushions add a `+$15.00` surcharge). Estimations update in real-time as quantities scale from 1 to 10.

### 3. Persistent Cart State
*   Adding items to the cart increments a global navigation cart badge, which fires a glowing pulse animation (`@keyframes pulseBadge`). It mounts items dynamically in a portaled shopping list overlay where aggregate subtotals are tracked.

---

## Slide 10: Storefront: Dynamic Verified Reviews Feed

*   Customer reviews are presented inside unified glassmorphic `Card` panels containing verification badge indicators, customer names, date strings, and stars.
*   An interactive review form utilizes custom `Input` components to capture feedback.
*   Submitting validated reviews immediately prepends the customer card to the local state reviews array, refreshing metrics and updating reviews count indicators dynamically.

```javascript
// Interactive reviews state prepending loop
const addedReview = {
  id: reviewsList.length + 1,
  author: newReviewAuthor,
  date: 'Today',
  rating: Number(newReviewRating),
  content: newReviewContent
};
setReviewsList([addedReview, ...reviewsList]);
```

---

## Slide 11: Architectural DRY Implementation

To adhere strictly to developer DRY practices, `assignment-2` imports components directly from the exact same consolidated modules index created in `assignment-1`:

```javascript
// 100% DRY import mappings inside assignment-2/src/App.jsx
import { 
  Button, 
  Badge, 
  Modal, 
  Alert 
} from './components';

// 100% DRY import mappings inside assignment-2/src/pages/ProductPage/ProductPage.jsx
import { 
  Button, 
  Card, 
  Badge, 
  Alert, 
  Input, 
  Modal 
} from '../../components';
```

*All component folder structures, CSS module styles, BEM classes, and index aggregators are exact copies, preserving central library uniformity.*

---

## Slide 12: Developer Setup & Launch Guide

To run local hot-rebuilding servers or compile production-grade distribution bundles:

### 1. Launch Assignment 1 (Component Library)
```powershell
cd assignment-1
npm install
npm run dev
```

### 2. Launch Assignment 2 (Responsive E-Commerce storefront)
```powershell
cd assignment-2
npm install
npm run dev
```

### 3. Production Build Compilation Validation
```powershell
# Compiles bundles inside the /dist folder with zero compile warnings
npm run build
```

---

## Slide 13: Summary of Accomplishments & GitHub Repo

### ✅ Deliverables Completed:
1.  **Component Library (Assignment 1):** Six BEM-scaffolded, scoped CSS, fully accessible components showcasing interactive states on a premium dashboard.
2.  **E-Commerce Page (Assignment 2):** High-fidelity spatial audio product page implementing mobile-first layouts, gallery swaps, sticky bars, review posts, and modal checkout carts.
3.  **Unified Design Tokens:** Google Fonts and custom dark HSL slate palettes.
4.  **Flawless Build Output:** Both projects compile with zero build warnings.
5.  **GitHub Push:** Staged, committed, and pushed both directories successfully.

### 🔗 Active Remote GitHub Link:
[https://github.com/akash2236/library.git](https://github.com/akash2236/library.git)
*(Active branch: `main`)*
