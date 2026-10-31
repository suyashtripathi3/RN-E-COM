export type Product = {
  category: string;
  colors?: string[];
  description: string;
  id: string;
  image: string;
  name: string;
  originalPrice?: number;
  price: number;
  rating: number;
  reviews: number;
  sizes?: string[];
};

export const categories = ['All', 'Audio', 'Wearables', 'Home', 'Fitness', 'Accessories'];

export const products: Product[] = [
  { category: 'Audio', colors: ['Midnight Black', 'Arctic White', 'Ocean Blue'], description: 'Immersive sound with deep bass, active noise cancellation and 40 hours of battery life. Pairs in seconds and stays comfortable through long listening sessions.', id: '1', image: 'https://picsum.photos/seed/headphones/400/400', name: 'Wireless Headphones', price: 2499, originalPrice: 3499, rating: 4.6, reviews: 128 },
  { category: 'Wearables', colors: ['Jet Black', 'Silver'], description: 'Track workouts, heart rate and sleep on a bright always-on display. Water resistant, with a battery that lasts up to 7 days on a single charge.', id: '2', image: 'https://picsum.photos/seed/watch/400/400', name: 'Smart Watch Series 5', price: 4999, originalPrice: 6999, rating: 4.8, reviews: 342 },
  { category: 'Audio', colors: ['Charcoal', 'Sand'], description: 'Room-filling 360° sound in a compact, splash-proof body. Take it from the desk to the balcony — 18 hours of playtime per charge.', id: '3', image: 'https://picsum.photos/seed/speaker/400/400', name: 'Bluetooth Speaker', price: 1799, originalPrice: 2499, rating: 4.4, reviews: 86 },
  { category: 'Fitness', colors: ['Steel', 'Matte Black', 'Teal'], description: 'Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. Leak-proof cap, sweat-free grip and fits most cup holders.', id: '4', image: 'https://picsum.photos/seed/bottle/400/400', name: 'Insulated Steel Bottle', price: 799, originalPrice: 1199, rating: 4.5, reviews: 210 },
  { category: 'Home', colors: ['White', 'Walnut'], description: 'A clean, minimal desk lamp with three colour temperatures and stepless dimming. The adjustable arm puts focused light exactly where you work.', id: '5', image: 'https://picsum.photos/seed/lamp/400/400', name: 'Minimal Desk Lamp', price: 1299, originalPrice: 1899, rating: 4.3, reviews: 64 },
  { category: 'Accessories', colors: ['Navy', 'Charcoal', 'Olive'], description: 'A 20L everyday carry with a padded 15-inch laptop sleeve, water-repellent fabric and an anti-theft back pocket. Built for commutes and weekend trips alike.', id: '6', image: 'https://picsum.photos/seed/backpack/400/400', name: 'Everyday Backpack', price: 2199, originalPrice: 2999, rating: 4.7, reviews: 187 },
  { category: 'Wearables', colors: ['Black', 'White'], description: 'Feather-light earbuds with punchy bass, clear calls and wireless charging. Up to 30 hours total playtime with the compact charging case.', id: '7', image: 'https://picsum.photos/seed/earbuds/400/400', name: 'True Wireless Earbuds', price: 1999, originalPrice: 2799, rating: 4.5, reviews: 256 },
  { category: 'Fitness', colors: ['Slate', 'Plum', 'Teal'], description: '6mm of dense, non-slip cushioning that protects knees without wobbling in balance poses. Sweat-resistant, easy to wipe clean and rolls up small.', id: '8', image: 'https://picsum.photos/seed/mat/400/400', name: 'Yoga Mat Pro', price: 999, originalPrice: 1499, rating: 4.6, reviews: 98 },
  { category: 'Audio', colors: ['Black', 'Coral'], description: 'Pocket-sized speaker with surprisingly big sound. Clip it to a bag, pair two for stereo, and enjoy 12 hours of music anywhere.', id: '9', image: 'https://picsum.photos/seed/minispeaker/400/400', name: 'Portable Mini Speaker', price: 1299, originalPrice: 1799, rating: 4.4, reviews: 74 },
  { category: 'Wearables', colors: ['Black', 'Rose'], description: 'All-day activity, sleep and heart-rate tracking in a slim band that disappears on your wrist. 14-day battery and 5ATM water resistance.', id: '10', image: 'https://picsum.photos/seed/fitnessband/400/400', name: 'Smart Fitness Band', price: 2999, originalPrice: 3999, rating: 4.5, reviews: 189 },
  { category: 'Fitness', description: 'Five resistance levels from light to extra-heavy, with comfortable handles and door anchor included. A full gym that fits in a drawer.', id: '11', image: 'https://picsum.photos/seed/bands/400/400', name: 'Resistance Bands Set', price: 899, originalPrice: 1299, rating: 4.3, reviews: 112, sizes: ['Light', 'Medium', 'Heavy', 'Full Set'] },
  { category: 'Home', colors: ['Terracotta', 'Sage', 'Cream'], description: 'A set of three hand-glazed ceramic pots with drainage and matching saucers. Sized for herbs, succulents and small houseplants.', id: '12', image: 'https://picsum.photos/seed/plantpot/400/400', name: 'Ceramic Plant Pot Set', price: 1099, originalPrice: 1599, rating: 4.6, reviews: 57 },
  { category: 'Home', description: '16 million colours, music sync and app control. Cut to length and stick anywhere — behind the TV, under shelves or along the ceiling.', id: '13', image: 'https://picsum.photos/seed/ledstrip/400/400', name: 'LED Strip Lights', price: 1499, originalPrice: 2199, rating: 4.4, reviews: 143, sizes: ['2 m', '5 m', '10 m'] },
  { category: 'Accessories', colors: ['Tan', 'Dark Brown', 'Black'], description: 'Full-grain leather that ages beautifully. Holds 8 cards plus cash, with RFID-blocking lining and a slim profile that sits flat in a pocket.', id: '14', image: 'https://picsum.photos/seed/wallet/400/400', name: 'Leather Wallet', price: 1199, originalPrice: 1699, rating: 4.7, reviews: 203 },
  { category: 'Accessories', colors: ['Grey', 'Navy'], description: 'A slim, shock-absorbing sleeve for 14-inch laptops with a soft microfibre lining and a front pocket for chargers and cables.', id: '15', image: 'https://picsum.photos/seed/sleeve/400/400', name: 'Laptop Sleeve 14-inch', price: 1599, originalPrice: 2199, rating: 4.5, reviews: 91 },
  { category: 'Fitness', description: 'Adjustable from 2.5 kg to 12.5 kg per dumbbell with a quick-dial mechanism. Two dumbbells replace a whole rack — ideal for home workouts.', id: '16', image: 'https://picsum.photos/seed/dumbbell/400/400', name: 'Adjustable Dumbbell Set', price: 3499, originalPrice: 4999, rating: 4.6, reviews: 68, sizes: ['Pair', 'Single'] },
];

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function discountPercent(product: Product): number {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}
