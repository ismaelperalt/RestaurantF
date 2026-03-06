import { createContext, useContext, useState } from "react";
import type {ReactNode} from 'react';
import type{ MenuItem } from "../../types/data";

interface CartItem {
  menuItem: MenuItem;
  qty: number;
  allergyNote: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  updateAllergyNote: (id: number, note: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.menuItem.id === item.id);
      if (exists) {
        return prev.map((c) =>
          c.menuItem.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { menuItem: item, qty: 1, allergyNote: "" }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.menuItem.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((c) => (c.menuItem.id === id ? { ...c, qty } : c))
    );
  };

  const updateAllergyNote = (id: number, note: string) => {
    setCart((prev) =>
      prev.map((c) => (c.menuItem.id === id ? { ...c, allergyNote: note } : c))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, c) => acc + c.qty, 0);
  const totalPrice = cart.reduce((acc, c) => acc + c.menuItem.price * c.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty,
      updateAllergyNote, clearCart, totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}