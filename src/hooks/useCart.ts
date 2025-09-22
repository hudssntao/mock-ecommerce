import { useContext } from "react";
import { CartContext } from "@/lib";

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("[useCart] Must be used within a CartProvider");
  }
  return context;
}
