export type Coupon = {
  code: string;
  description: string;
  kind: 'percent' | 'flat';
  maxDiscount?: number;
  minSubtotal: number;
  value: number;
};

export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    description: '10% off your order',
    kind: 'percent',
    minSubtotal: 499,
    value: 10,
  },
  {
    code: 'SAVE100',
    description: '₹100 off orders over ₹999',
    kind: 'flat',
    minSubtotal: 999,
    value: 100,
  },
  {
    code: 'FESTIVE20',
    description: '20% off orders over ₹1,999 (up to ₹500 off)',
    kind: 'percent',
    maxDiscount: 500,
    minSubtotal: 1999,
    value: 20,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return undefined;
  return COUPONS.find((coupon) => coupon.code === normalized);
}

export function validateCoupon(
  code: string,
  subtotal: number,
): { coupon: Coupon } | { error: string } {
  const coupon = findCoupon(code);
  if (!coupon) {
    return { error: 'That promo code is not valid. Try WELCOME10, SAVE100 or FESTIVE20.' };
  }
  if (subtotal < coupon.minSubtotal) {
    return {
      error: `This code needs a subtotal of at least ₹${coupon.minSubtotal.toLocaleString('en-IN')} — add more to your cart to use it.`,
    };
  }
  return { coupon };
}

export function couponDiscount(coupon: Coupon, subtotal: number): number {
  const raw = coupon.kind === 'percent' ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
  const capped = coupon.maxDiscount !== undefined ? Math.min(raw, coupon.maxDiscount) : raw;
  return Math.max(0, Math.min(subtotal, capped));
}
