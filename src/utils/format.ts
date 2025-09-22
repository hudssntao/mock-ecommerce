/**
 * Formats a number as a USD currency string
 * @param price - The price to format
 * @returns Formatted price string (e.g., "$19.99")
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
