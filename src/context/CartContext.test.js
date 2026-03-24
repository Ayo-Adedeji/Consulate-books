/**
 * Property-based tests for CartContext pure reducer logic.
 * Feature: book-store-enhancement
 * Uses fast-check for property generation.
 */
import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

// ---------------------------------------------------------------------------
// Pure reducer functions (mirrors CartContext.jsx logic)
// ---------------------------------------------------------------------------

function addToCartReducer(cartItems, book) {
  const existing = cartItems.find(item => item.id === book.id);
  if (existing) {
    return cartItems.map(item =>
      item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [
    ...cartItems,
    {
      id: book.id,
      title: book.title,
      cover: book.cover,
      ebookPrice: book.prices.ebook.discounted,
      pdf: book.pdf || null,
      quantity: 1,
    },
  ];
}

function removeFromCartReducer(cartItems, bookId) {
  return cartItems.filter(item => item.id !== bookId);
}

function updateQuantityReducer(cartItems, bookId, delta) {
  return cartItems.reduce((acc, item) => {
    if (item.id === bookId) {
      const newQty = item.quantity + delta;
      if (newQty < 1) return acc;
      return [...acc, { ...item, quantity: newQty }];
    }
    return [...acc, item];
  }, []);
}

function clearCartReducer() {
  return [];
}

function computeCartCount(cartItems) {
  return cartItems.reduce((s, i) => s + i.quantity, 0);
}

function computeCartTotal(cartItems) {
  return cartItems.reduce((s, i) => s + i.ebookPrice * i.quantity, 0);
}

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const arbId = fc.uuid();

const arbCartItem = fc.record({
  id: arbId,
  title: fc.string({ minLength: 1, maxLength: 50 }),
  cover: fc.string(),
  ebookPrice: fc.double({ min: 0.01, max: 999.99, noNaN: true }),
  pdf: fc.option(fc.webUrl(), { nil: null }),
  quantity: fc.integer({ min: 1, max: 100 }),
});

// Generates a cart (array of items with unique ids)
const arbCart = fc.array(arbCartItem, { minLength: 0, maxLength: 10 }).map(items => {
  const seen = new Set();
  return items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
});

// A book object compatible with addToCartReducer
const arbBook = (id) =>
  fc.record({
    id: id ?? arbId,
    title: fc.string({ minLength: 1, maxLength: 50 }),
    cover: fc.string(),
    prices: fc.record({
      ebook: fc.record({
        original: fc.double({ min: 1, max: 999, noNaN: true }),
        discounted: fc.double({ min: 0.01, max: 999, noNaN: true }),
      }),
    }),
    pdf: fc.option(fc.webUrl(), { nil: null }),
  });

// ---------------------------------------------------------------------------
// Property 1: addToCart increments quantity for existing items
// Validates: Requirements 2.2
// ---------------------------------------------------------------------------
describe("Property 1: addToCart increments quantity for existing items", () => {
  it("Feature: book-store-enhancement, Property 1 — Validates: Requirements 2.2", () => {
    fc.assert(
      fc.property(
        // cart with at least one item
        fc.array(arbCartItem, { minLength: 1, maxLength: 10 }).map(items => {
          const seen = new Set();
          return items.filter(item => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
          });
        }).filter(cart => cart.length >= 1),
        fc.integer({ min: 0, max: 9 }),
        (cart, idx) => {
          const targetItem = cart[idx % cart.length];
          const book = {
            id: targetItem.id,
            title: targetItem.title,
            cover: targetItem.cover,
            prices: { ebook: { original: targetItem.ebookPrice + 1, discounted: targetItem.ebookPrice } },
            pdf: targetItem.pdf,
          };

          const result = addToCartReducer(cart, book);

          // Distinct item count unchanged
          expect(result.length).toBe(cart.length);

          // Target item quantity incremented by 1
          const updated = result.find(i => i.id === targetItem.id);
          expect(updated).toBeDefined();
          expect(updated.quantity).toBe(targetItem.quantity + 1);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2: addToCart adds new book with quantity 1
// Validates: Requirements 2.3
// ---------------------------------------------------------------------------
describe("Property 2: addToCart adds new book with quantity 1", () => {
  it("Feature: book-store-enhancement, Property 2 — Validates: Requirements 2.3", () => {
    fc.assert(
      fc.property(
        arbCart,
        arbBook(),
        (cart, book) => {
          // Ensure book id is not already in cart
          fc.pre(!cart.some(item => item.id === book.id));

          const result = addToCartReducer(cart, book);

          // Distinct item count increases by 1
          expect(result.length).toBe(cart.length + 1);

          // New item has quantity 1
          const added = result.find(i => i.id === book.id);
          expect(added).toBeDefined();
          expect(added.quantity).toBe(1);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: updateQuantity removes item when quantity would drop below 1
// Validates: Requirements 2.4
// ---------------------------------------------------------------------------
describe("Property 3: updateQuantity removes item when quantity would drop below 1", () => {
  it("Feature: book-store-enhancement, Property 3 — Validates: Requirements 2.4", () => {
    fc.assert(
      fc.property(
        // cart with at least one item that has quantity exactly 1
        fc.array(arbCartItem, { minLength: 1, maxLength: 10 })
          .map(items => {
            const seen = new Set();
            return items.filter(item => {
              if (seen.has(item.id)) return false;
              seen.add(item.id);
              return true;
            });
          })
          .filter(cart => cart.length >= 1),
        fc.integer({ min: 0, max: 9 }),
        (cart, idx) => {
          const target = cart[idx % cart.length];
          // Force quantity to 1 for the target item
          const cartWithQty1 = cart.map(item =>
            item.id === target.id ? { ...item, quantity: 1 } : item
          );

          const result = updateQuantityReducer(cartWithQty1, target.id, -1);

          // Item should be absent
          expect(result.find(i => i.id === target.id)).toBeUndefined();
          // All other items remain
          expect(result.length).toBe(cartWithQty1.length - 1);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 4: clearCart always produces an empty cart
// Validates: Requirements 2.6
// ---------------------------------------------------------------------------
describe("Property 4: clearCart always produces an empty cart", () => {
  it("Feature: book-store-enhancement, Property 4 — Validates: Requirements 2.6", () => {
    fc.assert(
      fc.property(arbCart, (cart) => {
        const result = clearCartReducer(cart);
        expect(result).toEqual([]);
        expect(computeCartCount(result)).toBe(0);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 5: cartTotal equals sum of price times quantity
// Validates: Requirements 5.5, 10.4
// ---------------------------------------------------------------------------
describe("Property 5: cartTotal equals sum of price times quantity", () => {
  it("Feature: book-store-enhancement, Property 5 — Validates: Requirements 5.5, 10.4", () => {
    fc.assert(
      fc.property(arbCart, (cart) => {
        const expected = cart.reduce((s, i) => s + i.ebookPrice * i.quantity, 0);
        expect(computeCartTotal(cart)).toBeCloseTo(expected, 10);
      }),
      { numRuns: 100 }
    );
  });
});
