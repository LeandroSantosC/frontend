import { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardData } from "../components/Content/Card/Card";
import { BoardCardData } from "../components/MainBoard/BoardCard/BoardCard";

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
  const [voiceSettings, setVoiceSettings] = useState({
    selectedVoice: "",
    voiceSpeed: 1,
    voicePitch: 1
  });

  // Load voice settings from localStorage and set up interval to check for changes
  useEffect(() => {
    // Function to load voice settings
    const loadVoiceSettings = () => {
      const savedSettings = localStorage.getItem('voiceSettings');
      if (savedSettings) {
        setVoiceSettings(JSON.parse(savedSettings));
      }
    };
    
    // Initial load
    loadVoiceSettings();
    
    // Set up interval to check for changes (every 500ms)
    const intervalId = setInterval(loadVoiceSettings, 500);
    
    // Also listen for storage events (for cross-tab updates)
    window.addEventListener('storage', loadVoiceSettings);
    
    // Cleanup function
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', loadVoiceSettings);
    };
  }, []);

  const addCardOnMainBoard = (card: CardData) => {
    const newBoardCard: BoardCardData = {
      id: card.id,
      tempId: uuidv4(),
      name: card.name,
      image: card.image,
    };
    
    // Create utterance with voice settings
    const utterance = new SpeechSynthesisUtterance(card.name);
    utterance.rate = voiceSettings.voiceSpeed;
    utterance.pitch = voiceSettings.voicePitch;
    
    // Apply selected voice if available
    if (voiceSettings.selectedVoice) {
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === voiceSettings.selectedVoice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    
    setMainBoard((prevCards: BoardCardData[]) => [...prevCards, newBoardCard]);
  };

  const removeCard = (tempId: string) => {
    setMainBoard((prevCards) => prevCards.filter((card) => card.tempId !== tempId));
  };

  const removeLastCard = () => {
    setMainBoard((prevCards) => prevCards.slice(0, -1));
  };

  const removeAllCards = () => {
    setMainBoard([]);
  };

  return (
    <MainBoardContext.Provider
      value={{ mainBoard, setMainBoard, addCardOnMainBoard, removeCard, removeLastCard, removeAllCards }}
    >
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
