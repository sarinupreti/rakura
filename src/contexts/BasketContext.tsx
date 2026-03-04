"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export interface BasketItem {
  id: string;
  nameEn: string;
  nameTh: string;
  image?: string;
  category: string;
}

interface BasketContextType {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (id: string) => void;
  clearBasket: () => void;
  isInBasket: (id: string) => boolean;
  count: number;
}

const BasketContext = createContext<BasketContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearBasket: () => {},
  isInBasket: () => false,
  count: 0,
});

export function useBasket() {
  return useContext(BasketContext);
}

const STORAGE_KEY = "rakura-enquiry-basket";

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
    setMounted(true);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, mounted]);

  const addItem = useCallback((item: BasketItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearBasket = useCallback(() => {
    setItems([]);
  }, []);

  const isInBasket = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearBasket,
        isInBasket,
        count: items.length,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
