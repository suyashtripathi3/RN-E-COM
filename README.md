# RN-E-COM — Mini E-commerce App

A React Native e-commerce app built with Expo, TypeScript, Expo Router, and Zustand. Built in daily, pushable chunks.

## Tech stack

- Expo (SDK 54) + React Native + TypeScript
- Expo Router for navigation
- Zustand for cart state
- AsyncStorage for persistence
- Dummy product data to start (real API later)

## 7-day plan

- **Day 1 — Setup & Home shell:** Expo scaffold, theme, tab navigation, home screen
- **Day 2 — Product listing:** Search, category filter, sort
- **Day 3 — Product detail:** Gallery, options, quantity, related products
- **Day 4 — Cart:** Add/remove, quantity, totals, persistence
- **Day 5 — Checkout:** Address, delivery, order summary, success screen
- **Day 6 — Wishlist, orders & polish:** Wishlist, My Orders, animations
- **Day 7 — Portfolio-ready:** Icon/splash, error states, screenshots, final polish

## Run it

```bash
npm install
npx expo start
```

Then open it in Expo Go (Android / iOS) or press `a` / `i` for an emulator.

## Project structure

```
app/
  _layout.tsx          # Root layout
  (tabs)/
    _layout.tsx        # Bottom tabs
    index.tsx          # Home
    cart.tsx           # Cart (Day 4)
    wishlist.tsx       # Wishlist (Day 6)
    profile.tsx        # Profile / Orders (Day 6)
src/
  components/          # Header, ProductCard
  data/products.ts     # Dummy products
  store/cart.ts        # Zustand cart store
  theme/               # Colors, spacing, typography
```
