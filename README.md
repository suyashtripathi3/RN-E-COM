# RN-E-COM — Mini E-commerce App

A React Native e-commerce app built with Expo, TypeScript, Expo Router, and Zustand. Built in daily, pushable chunks — now complete through Day 7.

## What it does

- **Home & product listing:** 16 products, case-insensitive search, category chips, sort by Popular / Price low-to-high / Price high-to-low, result count, empty state with clear-filters, pull-to-refresh
- **Product detail:** Large image, rating + reviews, description, colour/size options where available, quantity selector (1–10) with live total, Add to Cart, related products
- **Cart:** Quantity controls, remove, clear all, subtotal, free delivery over ₹999 (otherwise ₹49), totals, cart badge on the tab bar, saved with AsyncStorage so it survives a restart
- **Checkout:** Delivery address form with validation, Standard / Express delivery, UPI / Card / Cash on delivery (demo — no real payment), order summary, order success screen with order ID and estimated delivery
- **Wishlist:** Heart toggle on every product card, saved with AsyncStorage, dedicated Wishlist tab
- **My Orders:** Orders created at checkout, listed in Profile with date, items, payment method and total, pull-to-refresh
- **Bottom tab navigation:** Floating rounded tab bar with an active pill, filled icons when selected, and count badges for Cart and Wishlist
- **Premium touches (2026-10-30):** Animated product cards that fade and slide in, a heart-pop animation, discount badges with strikethrough original prices, a Recently Viewed rail on Home, and a free-delivery progress bar in Cart
- **Product cards:** Rating badge on the photo, quick-add (+) button, and a wishlist heart on every card

## Tech stack

- Expo SDK 58 + React Native 0.88 + TypeScript
- Expo Router for navigation
- Zustand for cart, wishlist and orders state
- AsyncStorage for persistence
- Dummy product data (16 products, Picsum images) — a real API can replace `src/data/products.ts` later

> **Expo Go note:** This project uses Expo SDK 58. Make sure your Expo Go app is also on SDK 58, otherwise you will see an incompatibility screen. Run `npm install` after pulling, then `npx expo start` and scan the QR.

## Screenshots

Screenshots are not checked into the repo yet. To add them, run the app in Expo Go, take screenshots of Home, Product Detail, Cart, Checkout and My Orders, and save them under `docs/screenshots/` as `home.png`, `detail.png`, `cart.png`, `checkout.png`, `orders.png`, then link them here.

## App icon & splash

The app currently uses Expo's default icon and splash. To finish the branding, add `assets/icon.png` (1024×1024), `assets/adaptive-icon.png` (Android), and `assets/splash.png`, then set them in `app.json` under `icon`, `android.adaptiveIcon.foregroundImage`, and `splash` (via the `expo-splash-screen` plugin on SDK 58).

## Run it

```bash
npm install
npx expo start
```

Then open it in Expo Go (Android / iOS) or press `a` / `i` for an emulator.

To build an installable Android APK with EAS (needs an Expo account login first):

```bash
npx eas-cli build --platform android --profile preview
```

## Checks

```bash
npm run typecheck
npx expo-doctor@latest
```

## Project structure

```
app/
  _layout.tsx          # Root layout, Stack screens
  (tabs)/
    _layout.tsx        # Bottom tabs + cart badge
    index.tsx          # Home / product listing
    cart.tsx           # Cart
    wishlist.tsx       # Wishlist
    profile.tsx        # Profile / My Orders
  product/[id].tsx     # Product detail
  checkout.tsx         # Checkout flow
  order-success.tsx    # Order confirmation
src/
  components/          # Header, ProductCard (with wishlist heart)
  data/products.ts     # Dummy products (16 items)
  store/
    cart.ts            # Zustand cart store, persisted
    wishlist.ts        # Zustand wishlist store, persisted
    orders.ts          # Zustand orders store, persisted
  theme/               # Colors, spacing, typography
eas.json               # EAS Build profiles (preview = APK)
```

## 7-day build log

- **Day 1 — Setup & Home shell:** Expo scaffold, theme, tab navigation, home screen
- **Day 2 — Product listing:** Search, category filter, sort, 16 products
- **Day 3 — Product detail:** Options, quantity, related products, Add to Cart
- **Day 4 — Cart:** Quantity, totals, delivery, persistence
- **Day 5 — Checkout:** Address, delivery, payment, order success
- **Day 6 — Wishlist, orders & polish:** Wishlist, My Orders, cart badge, pull-to-refresh
- **Day 7 — Portfolio-ready:** Final polish, README, checks
- **Fix — SDK 58:** Upgraded from SDK 54 to SDK 58 to match Expo Go

## Daily improvements

From 2026-10-30, this project gets a small, real improvement every day — a new feature, a UI polish, or a useful fix — pushed to GitHub daily. The roadmap for upcoming days includes dark mode, coupon codes, order tracking, product reviews, search history, and price filters, picked one at a time so each day's change stays focused and verified.
