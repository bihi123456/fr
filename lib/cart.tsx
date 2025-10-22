import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type Product = {
  id: string;
  title: string;
  price: number; // in EUR
  image: string;
  description: string;
  category: string;
};

export const products: Product[] = [
  { id: 'ebook-cpa-debutant', title: 'E-book: Débuter en CPA', price: 19, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop', description: 'Les bases du CPA expliquées pas à pas.', category: 'Livres' },
  { id: 'formation-cpa-pro', title: 'Formation: CPA Pro', price: 149, image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop', description: 'Stratégies avancées pour scaler vos campagnes.', category: 'Formations' },
  { id: 'swipe-files', title: 'Swipe Files CPA', price: 39, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop', description: 'Bibliothèque de créas et angles gagnants.', category: 'Ressources' },
];

export type CartItem = { productId: string; quantity: number };

function cartReducer(state: CartItem[], action: any): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find(i => i.productId === action.productId);
      if (existing) {
        return state.map(i => i.productId === action.productId ? { ...i, quantity: i.quantity + (action.quantity || 1) } : i);
      }
      return [...state, { productId: action.productId, quantity: action.quantity || 1 }];
    }
    case 'remove':
      return state.filter(i => i.productId !== action.productId);
    case 'setQty':
      return state.map(i => i.productId === action.productId ? { ...i, quantity: action.quantity } : i);
    case 'clear':
      return [];
    default:
      return state;
  }
}

const CartContext = createContext<{ items: CartItem[]; add: (id: string, q?: number) => void; remove: (id: string) => void; setQty: (id: string, q: number) => void; clear: () => void; total: number } | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const api = useMemo(() => {
    const total = items.reduce((sum, item) => {
      const p = products.find(pr => pr.id === item.productId);
      return sum + (p ? p.price * item.quantity : 0);
    }, 0);
    return {
      items,
      add: (id: string, q = 1) => dispatch({ type: 'add', productId: id, quantity: q }),
      remove: (id: string) => dispatch({ type: 'remove', productId: id }),
      setQty: (id: string, q: number) => dispatch({ type: 'setQty', productId: id, quantity: q }),
      clear: () => dispatch({ type: 'clear' }),
      total,
    };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('CartProvider missing');
  return ctx;
}
