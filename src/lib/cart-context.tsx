"use client";

import type { ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import type { Cart } from "@/db/entities/Cart";
import type { Product } from "@/db/entities/Product";
import { api } from "@/trpc/react";

export type CartItem = Omit<Cart, "id"> & { product: Product };

export interface CartState {
  items: CartItem[];
  totalItems: number;
  isLoading: boolean;
}

export interface CartContextType {
  state: CartState;
  updateQuantity: (
    productId: number,
    quantity: number,
    product?: Product
  ) => void;
  getCartItem: (productId: number) => CartItem | undefined;
}

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

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

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
