export type Product = {
  category: string;
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
};

export const categories = ['All', 'Audio', 'Wearables', 'Home', 'Fitness', 'Accessories'];

export const products: Product[] = [
  { category: 'Audio', id: '1', image: 'https://picsum.photos/seed/headphones/400/400', name: 'Wireless Headphones', price: 2499, rating: 4.6, reviews: 128 },
  { category: 'Wearables', id: '2', image: 'https://picsum.photos/seed/watch/400/400', name: 'Smart Watch Series 5', price: 4999, rating: 4.8, reviews: 342 },
  { category: 'Audio', id: '3', image: 'https://picsum.photos/seed/speaker/400/400', name: 'Bluetooth Speaker', price: 1799, rating: 4.4, reviews: 86 },
  { category: 'Fitness', id: '4', image: 'https://picsum.photos/seed/bottle/400/400', name: 'Insulated Steel Bottle', price: 799, rating: 4.5, reviews: 210 },
  { category: 'Home', id: '5', image: 'https://picsum.photos/seed/lamp/400/400', name: 'Minimal Desk Lamp', price: 1299, rating: 4.3, reviews: 64 },
  { category: 'Accessories', id: '6', image: 'https://picsum.photos/seed/backpack/400/400', name: 'Everyday Backpack', price: 2199, rating: 4.7, reviews: 187 },
  { category: 'Wearables', id: '7', image: 'https://picsum.photos/seed/earbuds/400/400', name: 'True Wireless Earbuds', price: 1999, rating: 4.5, reviews: 256 },
  { category: 'Fitness', id: '8', image: 'https://picsum.photos/seed/mat/400/400', name: 'Yoga Mat Pro', price: 999, rating: 4.6, reviews: 98 },
  { category: 'Audio', id: '9', image: 'https://picsum.photos/seed/minispeaker/400/400', name: 'Portable Mini Speaker', price: 1299, rating: 4.4, reviews: 74 },
  { category: 'Wearables', id: '10', image: 'https://picsum.photos/seed/fitnessband/400/400', name: 'Smart Fitness Band', price: 2999, rating: 4.5, reviews: 189 },
  { category: 'Fitness', id: '11', image: 'https://picsum.photos/seed/bands/400/400', name: 'Resistance Bands Set', price: 899, rating: 4.3, reviews: 112 },
  { category: 'Home', id: '12', image: 'https://picsum.photos/seed/plantpot/400/400', name: 'Ceramic Plant Pot Set', price: 1099, rating: 4.6, reviews: 57 },
  { category: 'Home', id: '13', image: 'https://picsum.photos/seed/ledstrip/400/400', name: 'LED Strip Lights', price: 1499, rating: 4.4, reviews: 143 },
  { category: 'Accessories', id: '14', image: 'https://picsum.photos/seed/wallet/400/400', name: 'Leather Wallet', price: 1199, rating: 4.7, reviews: 203 },
  { category: 'Accessories', id: '15', image: 'https://picsum.photos/seed/sleeve/400/400', name: 'Laptop Sleeve 14-inch', price: 1599, rating: 4.5, reviews: 91 },
  { category: 'Fitness', id: '16', image: 'https://picsum.photos/seed/dumbbell/400/400', name: 'Adjustable Dumbbell Set', price: 3499, rating: 4.6, reviews: 68 },
];

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
