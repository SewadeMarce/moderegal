'use client';
import { createContext, useContext, useState, ReactNode, } from 'react';

type UserType = { id: string, full_name: string, email: string, phone: string, created_at: string, updated_at: string } | null;
type ContextType = {
  setUser: (user: UserType ) => void;
  user: UserType;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ initialCurrentUser, children }: { initialCurrentUser: null; children: ReactNode }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>(initialCurrentUser);

  const value: ContextType = {
   setUser,
    user,
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
