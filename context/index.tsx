'use client';
import { createContext, useContext, useState, ReactNode, useEffect, } from 'react';

export type UserType = { id: string, full_name: string, email: string, phone: string, city: string, created_at: string, updated_at: string, address: string } | null;
type ContextType = {
  user: UserType;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ initialCurrentUser, children }: { initialCurrentUser: null; children: ReactNode }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  useEffect(() => {

  }, [])
  const value: ContextType = {
    user: initialCurrentUser,
    showFilters,
    setShowFilters,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export const use = () => {
  const context = useContext(Context);
  if (!context) throw new Error("use doit être utilisé dans CartProvider");

  return context;
};
