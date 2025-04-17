import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { CardData } from "../components/Content/Card/Card";
import { deleteCard as deleteCardAPI,
         updateCard as updateCardAPI, 
         createCard as createCardAPI, 
         getCards } from "../services/CardAPI";

export interface CardContextType {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  categories: string[];
  createCard: (data: CardData) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  updateCard: (id: string, data: CardData) => Promise<void>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const result = await getCards();
      if (result.success) {
        setCards(result.response?.data || []);
      }
    };

    fetchCards();
  }, []);
  
  useEffect(() => {
    setCategories(cards
      .map((card) => card.category.name)
      .filter((name, index, self) => self.findIndex((t) => t === name) === index));
  }, [cards]);

  const deleteCard = async (id: string) => {

    //tem certeza que deseja excluir este cartão? Isso não pode ser desfeito.

    const result = await deleteCardAPI(id);
    if (result.success) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }
  };

  const updateCard = async (id: string, data: CardData) => {
    const result = await updateCardAPI(id, data);
    if (result.success) {
      setCards((prevCards) => prevCards.map((card) => (card.id === id ? data : card)));
    }
  };

  const createCard = async (data: CardData) => {
    const result = await createCardAPI(data);
    if (result.success) {
      setCards((prevCards) => [...prevCards, data]);
    }
  };

  return (
    <CardContext.Provider value={{ cards, setCards, categories, createCard, deleteCard, updateCard }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext():CardContextType {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("CardContext deve ser usado dentro de um CardProvider");
  }
  return context;
}