"use client";

import type { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import type { Cart } from "@/db/entities/Cart";
import type { Product } from "@/db/entities/Product";
import { api } from "@/trpc/react";

/**
 * Cart item type representing a product with its quantity in the cart.
 * Omits the database ID from the Cart entity and includes full product details.
 */
export type CartItem = Omit<Cart, "id"> & { product: Product };

/**
 * Cart state interface defining the structure of the cart's local state.
 */
export interface CartState {
  /** Array of items currently in the cart */
  items: CartItem[];
  /** Total number of individual items across all cart entries */
  totalItems: number;
  /** Loading state for cart operations */
  isLoading: boolean;
}

/**
 * Cart context interface defining available cart operations and state.
 */
export interface CartContextType {
  /** Current cart state */
  state: CartState;
  /** 
   * Updates the quantity of a product in the cart
   * @param productId - ID of the product to update
   * @param quantity - New quantity (0 removes the item)
   * @param product - Product data (required for new items)
   */
  updateQuantity: (
    productId: number,
    quantity: number,
    product?: Product
  ) => void;
  /**
   * Retrieves a cart item by product ID
   * @param productId - ID of the product to find
   * @returns Cart item or undefined if not found
   */
  getCartItem: (productId: number) => CartItem | undefined;
}

/**
 * Union type defining all possible cart actions for the reducer.
 */
type CartAction =
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: number;
        quantity: number;
        product?: Product;
      };
    }
  | { type: "SET_CART"; payload: { items: CartItem[] } }
  | { type: "SET_LOADING"; payload: { isLoading: boolean } };

/**
 * Cart reducer function managing cart state transitions.
 * 
 * Handles all cart operations including quantity updates, cart initialization,
 * and loading state management. Implements immutable state updates following
 * React best practices.
 * 
 * @param state - Current cart state
 * @param action - Action to perform on the cart
 * @returns New cart state
 */
const cart_reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "UPDATE_QUANTITY": {
      const { productId, quantity, product } = action.payload;

      if (quantity <= 0) {
        const newItems = state.items.filter(
          (item) => item.product.id !== productId
        );
        return {
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          isLoading: state.isLoading,
        };
      }

      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity } : item
        );
      } else if (product) {
        const newItem: CartItem = {
          product,
          quantity,
        };
        newItems = [...state.items, newItem];
      } else {
        return state;
      }

      return {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        isLoading: state.isLoading,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
      
    case "SET_CART": {
      const totals = {
        totalItems: action.payload.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
      };
      return {
        items: action.payload.items,
        ...totals,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

const initial_state: CartState = {
  items: [],
  totalItems: 0,
  isLoading: true,
};

/**
 * React context for cart state management.
 * 
 * Provides cart state and operations to all child components. Must be used
 * with CartProvider to ensure proper initialization.
 */
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

/**
 * Cart provider component that manages global cart state.
 * 
 * Provides cart functionality to all child components through React Context.
 * Automatically syncs with server on mount and manages local state updates.
 * Should wrap the entire application or major sections requiring cart access.
 * 
 * @param children - Child components that will have access to cart context
 * 
 * @example
 * ```typescript
 * // In app layout or root component
 * function App({ children }) {
 *   return (
 *     <TRPCProvider>
 *       <CartProvider>
 *         {children}
 *       </CartProvider>
 *     </TRPCProvider>
 *   );
 * }
 * ```
 * 
 * @features
 * - Automatic server synchronization on mount
 * - Optimistic UI updates for better UX
 * - Loading state management
 * - Persistent cart across page refreshes
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cart_reducer, initial_state);

  const { data: cartData, isLoading } = api.cart.getEntireCart.useQuery();

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: { isLoading } });
  }, [isLoading]);

  useEffect(() => {
    if (cartData) {
      dispatch({ type: "SET_CART", payload: { items: cartData } });
    }
  }, [cartData]);

  const updateQuantity = (
    productId: number,
    quantity: number,
    product?: Product
  ) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, quantity, product },
    });
  };

  const getCartItem = (productId: number) => {
    return state.items.find((item) => item.product.id === productId);
  };

  const contextValue: CartContextType = {
    state,
    updateQuantity,
    getCartItem,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
