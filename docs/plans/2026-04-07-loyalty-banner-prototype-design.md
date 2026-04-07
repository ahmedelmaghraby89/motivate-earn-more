# Loyalty In-App Banner — Interactive Prototype Design

**Date:** 2026-04-07
**Author:** Ahmed Maghraby + Claude
**Purpose:** Build an interactive HTML/CSS prototype for moderated usability testing of the loyalty in-app banner feature.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Shopping flow | Homepage → Category → PDP loop | Realistic flow gives better research signal |
| Loyalty Hub | Detailed rewards page with pinned reward | Validates banner CTA comprehension |
| Product images | Real images from Breadfast Design System Figma | Realism matters for moderated testing |
| Product count | 12+ products | Realistic catalog feel for natural browsing |
| Language | English LTR | Sufficient for test participants |
| Points counter | Visible in header for both approaches | Grounds users in loyalty context |
| Banner auto-dismiss | 5 seconds | Per Ahmed's preference |
| Visual fidelity | Pixel-perfect match to Figma prototype screens | Exact replication of existing designs |

## Architecture

Single-page HTML app, vanilla JS, no framework. Breadfast UI CDN for base components. No build step — open directly in browser.

### Screen Flow (7 screens)

1. **Homepage** — Category icons, reorder carousel (4 products), promotional banners
2. **Category (Supermarket)** — 2-column product grid, 12+ products with "Add" buttons
3. **PDP** — Product image, name, price, weight, quantity stepper, "Add to Cart" CTA
4. **Cart** — Item list with quantities, subtotal, points summary, checkout button
5. **Checkout** — Order summary, delivery/payment (static), "Place Order" button
6. **Order Placed** — Confirmation with points earned summary
7. **Loyalty Hub** — Progress ring, pinned target reward, full reward catalog

### Two Approaches

Both share identical screens. Difference is banner trigger logic only.

**Approach B (Single Trigger):**
- Banner fires once when projected points reach 50 pts from 1,500 threshold
- Copy: "Almost there! | Add 50 EGP more to unlock a free product"

**Approach C (Three Triggers):**
- Banner 1 (Start): 1st item add. "+[X] points on this item | [total]/1,500 points to unlock a free product"
- Banner 2 (Near): At 1,450 projected pts. "Almost there! | Add 50 EGP more to unlock a free product"
- Banner 3 (Achieved): At 1,500+ projected pts. "Free product unlocked! | Will be available after this order delivery"

### Points Engine

- Starting balance: 1,200 confirmed points
- 1 EGP = 1 point (regular), 1 EGP = 2 points (private label)
- Nearest reward: 1,500 pts (Free V Super Soda Cola Can)

### Banner Behavior

- Fixed overlay below app header, slides in 300ms ease-out
- 5s auto-dismiss, swipe-up manual dismiss
- First-ever exposure persists until dismissed
- Chevron (›) deep-links to Loyalty Hub with pinned reward

## File Structure

```
/prototype
├── index.html              # Landing page with links to both approaches
├── approach-b.html         # Single trigger prototype
├── approach-c.html         # Three trigger prototype
├── css/
│   ├── app.css             # App shell, screen layouts, transitions
│   ├── banner.css          # Banner component styles & animations
│   └── loyalty-hub.css     # Loyalty hub screen styles
├── js/
│   ├── app.js              # Screen navigation, cart state, points engine
│   ├── banner.js           # Banner trigger logic, dismiss, animation
│   └── products.js         # Product data catalog
└── img/
    └── products/           # Product images from Figma
```

## Product Catalog

| # | Product | Price (EGP) | Type | Points |
|---|---------|-------------|------|--------|
| 1 | Sante Italiano Big Rings Pasta (400g) | 25 | Regular | 25 |
| 2 | Molto Mini Magnum Chocolate Hazelnut (84g) | 15 | Regular | 15 |
| 3 | Afia Sunflower Oil (800ml) | 89 | Regular | 89 |
| 4 | Iced Cinnamon White Mocha | 160 | Private Label | 320 |
| 5 | Iced Matcha Spanish Latte | 140 | Private Label | 280 |
| 6 | Classic Chicken Caesar Salad | 140 | Regular | 140 |
| 7 | Signature Tuna Sandwich | 130 | Regular | 130 |
| 8 | Turkey & Cheese Sandwich | 120 | Regular | 120 |
| 9 | Juhayna Full Cream Milk (1.5L) | 45 | Regular | 45 |
| 10 | Simply 3 Ply Facial Tissue Pack | 35 | Regular | 35 |
| 11 | Breadfast Classic Millefeuille Cup | 85 | Private Label | 170 |
| 12 | Breadfast Belgian Dark Chocolate (75g) | 95 | Private Label | 190 |
