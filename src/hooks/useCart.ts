import { useContext } from "react";
import { CartContext } from "@/lib";

/**
 * Hook for accessing cart state and operations throughout the application.
 * 
 * Provides access to the cart context including current cart state,
 * item management functions, and loading states. Must be used within
 * a CartProvider component tree.
 * 
 * @returns CartContextType containing cart state and operations
 * 
 * @throws Error if used outside of CartProvider
 * 
 * @example
 * ```typescript
 * function CartSummary() {
 *   const { state, updateQuantity, getCartItem } = useCart();
 *   
 *   return (
 *     <div>
 *       <p>Items: {state.totalItems}</p>
 *       <p>Loading: {state.isLoading}</p>
 *       {state.items.map(item => (
 *         <div key={item.product.id}>
 *           {item.product.name} - Qty: {item.quantity}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example Updating quantities:
 * ```typescript
 * function ProductActions({ product }) {
 *   const { updateQuantity, getCartItem } = useCart();
 *   const cartItem = getCartItem(product.id);
 *   
 *   const handleAddToCart = () => {
 *     const newQuantity = (cartItem?.quantity || 0) + 1;
 *     updateQuantity(product.id, newQuantity, product);
 *   };
 *   
 *   return <button onClick={handleAddToCart}>Add to Cart</button>;
 * }
 * ```
 * 
 * @see {@link CartContext} for the context definition
 * @see {@link useCartWithSync} for server-synchronized cart operations
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("[useCart] Must be used within a CartProvider");
  }
  return context;
}
