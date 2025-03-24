import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";
import { BoardCardData } from "../components/MainBoard/BoardCard/BoardCard";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardData } from "../components/Content/Card/Card";

export interface BoardContextType {
    mainBoard: BoardCardData[];
    setMainBoard: Dispatch<SetStateAction<BoardCardData[]>>;
    addCardOnMainBoard: (card: CardData) => void;
    removeCard: (tempId: string) => void;
    removeLastCard: () => void;
    removeAllCards: () => void;
}

const MainBoardContext = createContext<BoardContextType | undefined>(undefined);

export function MainBoardProvider({ children }: { children: ReactNode }) {
  const [mainBoard, setMainBoard] = useState<BoardCardData[]>([]);

  const addCardOnMainBoard = (card: CardData) => {
    const newBoardCard: BoardCardData = {
      id: card.id,
      tempId: uuidv4(),
      name: card.name,
      img: card.image,
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(card.name));
    setMainBoard((prevCards: BoardCardData[]) => [...prevCards, newBoardCard]);
  };

  const removeCard = (tempId: string) => {
    setMainBoard((prevCards) => prevCards.filter((card) => card.tempId !== tempId));
  }

  const removeLastCard = () => {
    setMainBoard((prevCards) => prevCards.slice(0, -1));
  }

  const removeAllCards = () => {
    setMainBoard([]);
  }

  return (
    <MainBoardContext.Provider value={{ mainBoard, setMainBoard, addCardOnMainBoard, removeCard, removeLastCard, removeAllCards }}>
      {children}
    </MainBoardContext.Provider>
  );
}

export function useMainBoardContext():BoardContextType {
  const context = useContext(MainBoardContext);
  if (!context) {
    throw new Error("useMainBoardContext deve ser usado dentro de um MainBoardProvider");
  }
  return context;
}
