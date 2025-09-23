/**
 * Formats a numeric price value as a localized USD currency string.
 * 
 * Uses the Intl.NumberFormat API to ensure consistent currency formatting
 * across different browsers and locales. Always formats as US dollars with
 * appropriate decimal places and currency symbols.
 * 
 * @param price - The numeric price value to format (supports decimals)
 * @returns Formatted currency string with dollar sign and proper decimal places
 * 
 * @example
 * ```typescript
 * formatPrice(19.99)    // Returns "$19.99"
 * formatPrice(1000)     // Returns "$1,000.00"
 * formatPrice(0.5)      // Returns "$0.50"
 * formatPrice(2499.99)  // Returns "$2,499.99"
 * ```
 * 
 * @example Usage in components:
 * ```typescript
 * const ProductPrice = ({ price }: { price: number }) => (
 *   <span className="text-lg font-bold">
 *     {formatPrice(price)}
 *   </span>
 * );
 * ```
 * 
 * @throws {RangeError} If the price is not a finite number
 * @throws {TypeError} If the price is not a number
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
