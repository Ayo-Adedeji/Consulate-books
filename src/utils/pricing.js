/**
 * Central pricing utility — single source of truth for all discount logic.
 * All components must derive prices from these functions.
 */

/**
 * Returns true only when a real discount exists (discounted < original).
 */
export function hasDiscount(priceObj) {
  if (!priceObj) return false;
  const { original, discounted } = priceObj;
  return (
    typeof original === "number" &&
    typeof discounted === "number" &&
    discounted < original
  );
}

/**
 * Returns the final price the customer pays.
 * Uses discounted price only when a real discount exists.
 */
export function getFinalPrice(priceObj) {
  if (!priceObj) return 0;
  return hasDiscount(priceObj) ? priceObj.discounted : priceObj.original ?? 0;
}

/**
 * Returns the discount percentage (0–100), or null if no discount.
 */
export function getDiscountPercent(priceObj) {
  if (!hasDiscount(priceObj)) return null;
  return Math.round(
    ((priceObj.original - priceObj.discounted) / priceObj.original) * 100
  );
}

/**
 * Convenience: get ebook pricing info for a book object.
 * Returns { hasEbook, finalPrice, originalPrice, discountedPrice, discountPercent }
 */
export function getEbookPricing(book) {
  const priceObj = book?.prices?.ebook ?? null;
  const hasEbook = Boolean(priceObj);
  return {
    hasEbook,
    priceObj,
    finalPrice: getFinalPrice(priceObj),
    originalPrice: priceObj?.original ?? null,
    discountedPrice: priceObj?.discounted ?? null,
    discountPercent: getDiscountPercent(priceObj),
    isDiscounted: hasDiscount(priceObj),
  };
}
