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
];

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
