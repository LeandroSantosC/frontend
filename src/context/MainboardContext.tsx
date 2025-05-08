import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";
import { BoardCardData } from "../components/MainBoard/BoardCard/BoardCard";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardData } from "../components/Content/Card/Card";
import { conjugate } from "../utils/conjugador.ts"


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

  const pronomes = {
    eu: 0,
    tu: 1,
    você: 2,
    voce: 2,
    ele: 2,
    ela: 2,
    nós: 3,
    nos: 3,
    vós: 4,
    vos: 4,
    vocês: 5,
    voces: 5,
    eles: 5,
    elas: 5,
  } as const;
  
  type Pronome = keyof typeof pronomes;
  

  const addCardOnMainBoard = (card: CardData) => {
    const newBoardCard: BoardCardData = {
      id: card.id,
      tempId: uuidv4(),
      name: card.name,
      img: card.image,
    };

    if(card.name.endsWith("ar") || 
      card.name.endsWith("er") || 
      card.name.endsWith("ir") || 
      card.name.endsWith("pôr")){

      const lastWord = mainBoard.slice(-1)[0]?.name;

      if(lastWord in pronomes){
        const index = pronomes[lastWord as Pronome];
        const conjugated = conjugate(card.name);
        if (conjugated?.p) {
          newBoardCard.name = conjugated.p[index];
        }
      }
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(newBoardCard.name));
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
