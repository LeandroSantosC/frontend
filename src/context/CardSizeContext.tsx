import { createContext, useState, useContext, ReactNode } from 'react';

interface CardSizeContextType {
  cardSize: number;
  setCardSize: (size: number) => void;
}

const CardSizeContext = createContext<CardSizeContextType | undefined>(undefined);

export function CardSizeProvider({ children }: { children: ReactNode }) {
  const [cardSize, setCardSize] = useState<number>(50); // Default size (50%)

  return (
    <CardSizeContext.Provider value={{ cardSize, setCardSize }}>
      {children}
    </CardSizeContext.Provider>
  );
}

export function useCardSize() {
  const context = useContext(CardSizeContext);
  if (context === undefined) {
    throw new Error('useCardSize must be used within a CardSizeProvider');
  }
  return context;
} 