

"use client";
import { addToCart, removeFromCart, updateCartItemQuantity, } from "@/lib/actions";
import { CartItemType, ProductCart } from "@/types";
import {
  createContext, useContext, useOptimistic,
  useTransition,
} from "react";
// Type pour l'action du reducer
type CartAction = 
  | { type: "add"; payload: { product_id: string; product: ProductCart; quantity: number } }
  | { type: "remove"; payload: { id: string } }
  | { type: "update"; payload: { id: string; quantity: number } };

interface CartContextType {
  items: CartItemType[];
  count: number;
  total: number;
  subtotal: number;
  shipping: number;
  isPending: boolean;
  add: (product_id: string, product: ProductCart,quantity:number) => void;
  remove: (cartItemId: string) => void;
  update: (cartItemId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
  initialItems = [],
  userId
}: {
  children: React.ReactNode;
  initialItems?: CartItemType[];
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();
  
  // useOptimistic : état "fantôme" mis à jour immédiatement
  const [optimisticItems, dispatch] = useOptimistic(
    initialItems,
    (state: CartItemType[], action:CartAction): CartItemType[] => {
      switch (action.type) {
        case "add": {
          const existing = state.find(i => i.product_id === action.payload.product_id);
          if (existing) {
            return state.map(i =>
              i.product_id === action.payload.product_id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
          }
         return [...state, {
            id: "optimistic-" + Date.now(),
            product_id: action.payload.product_id,
            quantity: action.payload.quantity,
            ...action.payload.product, // On spread le produit pour respecter l'intersection & Product
          }];
        }
        case "remove":
          return state.filter(i => i.id !== action.payload.id);
        case "update":
          if ((action.payload.quantity ?? 0) <= 0)
            return state.filter(i => i.id !== action.payload.id);
          return state.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: action.payload.quantity! }
              : i
          );
        default:
          return state;
      }
    }
  );
 

 function add(product_id: string, product: ProductCart, quantity: number) {
    startTransition(async () => {
      // Correction ici : envoyer la quantité
      dispatch({ type: "add", payload: { product_id, product, quantity } });
      console.log('ajout de produt:', product);

      await addToCart(product_id, product, quantity);
    });
  }

  function remove(cartItemId: string) {
    startTransition(async () => {
      dispatch({ type: "remove", payload: { id: cartItemId } });
      await removeFromCart(cartItemId);
    });
  }

  function update(cartItemId: string, quantity: number) {
    startTransition(async () => {
      dispatch({ type: "update", payload: { id: cartItemId, quantity } });
      await updateCartItemQuantity(cartItemId, quantity);
    });
  }
 const count = optimisticItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = optimisticItems.reduce(
    (s, i) => s + Number(i.price) * i.quantity, 0
  );
  const shipping = subtotal > 100000 || subtotal === 0 ? 0 : 1500; // Livraison gratuite au-dessus de 10 000 FCFA
  const total = subtotal + shipping;
    console.log({subtotal,shipping,total});

  return (
    <CartContext.Provider value={{ items: optimisticItems, count, total,subtotal, shipping, isPending, add, remove, update }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider");
  return ctx;
}