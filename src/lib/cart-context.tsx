"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import type { Cart } from "@/entities/Cart";
import type { Product } from "@/entities/Product";
import { api } from "@/trpc/react";

export type CartItem = Cart & { product: Product };

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

export interface CartContextType {
  state: CartState;
  addToCart: (product: CartItem["product"], quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    product?: CartItem["product"]
  ) => void;
  clearCart: () => void;
  getCartItem: (productId: number) => CartItem | undefined;
}

type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: { product: CartItem["product"]; quantity: number };
    }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number } }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: number;
        quantity: number;
        product?: CartItem["product"];
      };
    }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: { items: CartItem[] } }
  | { type: "SET_LOADING"; payload: { isLoading: boolean } };

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now(), // Simple ID generation - in real app you'd use proper ID
          product,
          quantity,
        };
        newItems = [...state.items, newItem];
      }

      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals,
        isLoading: state.isLoading,
      };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals,
        isLoading: state.isLoading,
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity, product } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const newItems = state.items.filter(
          (item) => item.product.id !== productId
        );
        const totals = calculateTotals(newItems);
        return {
          items: newItems,
          ...totals,
          isLoading: state.isLoading,
        };
      }

      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );

      let newItems: CartItem[];
      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity } : item
        );
      } else if (product) {
        // Add new item if it doesn't exist and product is provided
        const newItem: CartItem = {
          id: Date.now(), // Simple ID generation - in real app you'd use proper ID
          product,
          quantity,
        };
        newItems = [...state.items, newItem];
      } else {
        // Item doesn't exist and no product provided, return current state
        return state;
      }

      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals,
        isLoading: state.isLoading,
      };
    }

    case "CLEAR_CART": {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        isLoading: state.isLoading,
      };
    }

    case "SET_CART": {
      const totals = calculateTotals(action.payload.items);
      return {
        items: action.payload.items,
        ...totals,
        isLoading: false,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }

    default:
      return state;
  }
};

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: true,
};

// Create context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Cart Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart data from database on mount
  const { data: cartData, isLoading } = api.cart.getEntireCart.useQuery();

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: { isLoading } });
  }, [isLoading]);

  useEffect(() => {
    if (cartData) {
      dispatch({ type: "SET_CART", payload: { items: cartData } });
    }
  }, [cartData]);

  // Cart actions
  const addToCart = (product: CartItem["product"], quantity: number = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    product?: CartItem["product"]
  ) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, quantity, product },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartItem = (productId: number) => {
    return state.items.find((item) => item.product.id === productId);
  };

  const contextValue: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
