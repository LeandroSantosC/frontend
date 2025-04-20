import "./MainBoard.css";
import BoardCard from "./BoardCard/BoardCard";
import { useMainBoardContext } from "../../context/MainboardContext";
import { BoardContextType } from "../../context/MainboardContext";
import { useEffect, useState } from "react";

export default function MainBoard() {
  const { mainBoard, removeCard, removeAllCards, removeLastCard }: BoardContextType =
    useMainBoardContext();
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

  const speak = () => {
    const phrase = mainBoard.map((card) => card.name).join(" ");
    const utterance = new SpeechSynthesisUtterance(phrase);
    
    // Apply voice settings
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
  };

  return (
    <div className="MainBoard">
      <div className="flex flex-col shrink-0 w-[15%] max-w-[48px] justify-around h-full px-2">
        <button
          className="w-full rounded-full aspect-square"
          onClick={removeLastCard}
          aria-label="Remover último card"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          ↩
        </button>
        <button
          className="w-full rounded-full aspect-square"
          onClick={() => removeAllCards()}
          aria-label="Remover todos os cards"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          🗑️
        </button>
      </div>

      <div
        className="flex h-full grow overflow-x-scroll overflow-y-hidden scrollbar-hide gap-2 p-1 items-center justify-start"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          maxHeight: "100%",
          boxSizing: "border-box",
        }}
      >
        {mainBoard.map((card) => (
          <BoardCard
            key={card.tempId}
            id={card.tempId}
            name={card.name}
            image={card.image}
          />
        ))}
      </div>

      <div className="max-w-[48px] shrink-0 w-[15%] px-2">
        <button
          className="w-full rounded-full aspect-square"
          onClick={speak}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          🔊
        </button>
      </div>
    </div>
  );
}