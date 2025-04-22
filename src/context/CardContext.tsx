import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { CardData } from "../components/Content/Card/Card";
import { deleteCard as deleteCardAPI,
         updateCard as updateCardAPI, 
         createCard as createCardAPI, 
         getCards } from "../services/CardAPI";

export interface CardContextType {
  cards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  categories: {id: string, name: string}[];
  createCard: (data: CardData) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  updateCard: (id: string, data: CardData) => Promise<void>;
  editCard: {card: CardData, cardRef: React.RefObject<HTMLDivElement>} | null;
  setEditCard: React.Dispatch<React.SetStateAction<{card: CardData, cardRef: React.RefObject<HTMLDivElement>} | null>>;
  setVisible: (id: string) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [editCard, setEditCard] = useState<{card: CardData, cardRef: React.RefObject<HTMLDivElement>} | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      const result = await getCards();
      if (result.success) {
        setCards(result.response?.data.sort((a: CardData, b: CardData) => a.position - b.position)|| []);
      }
    };

    fetchCards();
  }, []);
  
  useEffect(() => {
    setCategories(cards
      .map((card) => card.category)
      .filter((category, index, self) => self.findIndex((t) => t.name === category.name) === index));

      cards.map((card) => console.log(card));
  }, [cards]);

  const setVisible = (id: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, visible: !card.visible } : card
      )
    );
  };
  

  const deleteCard = async (id: string) => {

    //tem certeza que deseja excluir este cartão? Isso não pode ser desfeito.

    // const result = await deleteCardAPI(id);
    // if (result.success) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    // }
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
    <CardContext.Provider value={{ cards, setCards, categories, createCard, deleteCard, updateCard, editCard, setEditCard, setVisible }}>
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