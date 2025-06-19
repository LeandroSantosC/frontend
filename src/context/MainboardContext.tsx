import { createContext, useState, Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardData } from "../components/Content/Card/Card";
import { conjugate } from "../utils/conjugador.ts"
import { useAuth } from "./AuthContext.tsx";


export interface BoardContextType {
  mainBoard: CardData[];
  setMainBoard: Dispatch<SetStateAction<CardData[]>>;
  addCardOnMainBoard: (card: CardData) => void;
  removeCard: (tempId: string | undefined) => void;
  removeLastCard: () => void;
  removeAllCards: () => void;
  speak: () => void;
  voices: SpeechSynthesisVoice[]
  selectedVoice: SpeechSynthesisVoice | null
  setSelectedVoice: Dispatch<SetStateAction<SpeechSynthesisVoice | null>>
  utterance: SpeechSynthesisUtterance;
}

const getAvailableVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
    } else {
      // Algumas vezes as vozes ainda não carregaram
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    }
  });
};

const MainBoardContext = createContext<BoardContextType | undefined>(undefined);

export function MainBoardProvider({ children }: { children: ReactNode }) {
  const [mainBoard, setMainBoard] = useState<CardData[]>([]);
  const { user } = useAuth();
  const [utterance, setUtterance] = useState(new SpeechSynthesisUtterance);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    getAvailableVoices().then((availableVoices) => {
      setVoices(availableVoices);
      let selectedVoice: SpeechSynthesisVoice | undefined;
      if (user?.voice) {
        selectedVoice = availableVoices.find((voice) => voice.voiceURI === user.voice);
      } else {
        selectedVoice = availableVoices.find((voice) => voice.default);
      }
      if (selectedVoice) {
        setSelectedVoice(selectedVoice);
      }
    });
  }, [user?.voice]);

  useEffect(() => {
    setUtterance((prev) => {
      prev.voice = selectedVoice || null;
      return prev;
    });
  }, [selectedVoice])

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

  const [queue, setQueue] = useState<CardData[]>([]);
  const processingRef = useRef(false);
  useEffect(() => {
    if (queue.length === 0 || processingRef.current) return;

    const card = queue[0];
    processingRef.current = true;

    const newCard: CardData = { ...card, tempId: uuidv4() };
    const lastWord = mainBoard.at(-1)?.name;

    if (
      (card.name.endsWith("ar") || card.name.endsWith("er") || card.name.endsWith("ir") || card.name.endsWith("pôr")) &&
      lastWord &&
      lastWord in pronomes
    ) {
      const index = pronomes[lastWord as Pronome];
      const conjugated = conjugate(card.name);

      if (conjugated?.p) {
        newCard.name = conjugated.p[index];
      }
    }

    setMainBoard((prev) => {
      const updated = [...prev, newCard];
      return updated;
    });

    // Aguarda um ciclo para o React atualizar antes de processar o próximo
    setTimeout(() => {
      processingRef.current = false;
      setQueue((prev) => prev.slice(1)); // Remove o primeiro item da fila
    }, 50); // 50ms é suficiente na maioria dos casos
  }, [queue, mainBoard]);


  const addCardOnMainBoard = (card: CardData) => {
    setQueue((prev) => [...prev, card]);
    window.speechSynthesis.cancel();
    utterance.text = card.name;
    window.speechSynthesis.speak(utterance);
  };

  const speak = () => {
    const phrase = mainBoard.map((card) => card.name).join(" ");

    window.speechSynthesis.cancel();
    utterance.text = phrase;
    window.speechSynthesis.speak(utterance);
  }

  const removeCard = (tempId: string | undefined) => {
    setMainBoard((prevCards) => prevCards.filter((card) => card.tempId !== tempId));
  }

  const removeLastCard = () => {
    setMainBoard((prevCards) => prevCards.slice(0, -1));
  }

  const removeAllCards = () => {
    setMainBoard([]);
  }

  return (
    <MainBoardContext.Provider value={{ mainBoard, setMainBoard, addCardOnMainBoard, removeCard, removeLastCard, removeAllCards, speak, voices, selectedVoice, setSelectedVoice, utterance }}>
      {children}
    </MainBoardContext.Provider>
  );
}

export function useMainBoardContext(): BoardContextType {
  const context = useContext(MainBoardContext);
  if (!context) {
    throw new Error("useMainBoardContext deve ser usado dentro de um MainBoardProvider");
  }
  return context;
}
