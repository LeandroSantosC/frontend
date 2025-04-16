import "./MainBoard.css";
import BoardCard from "./BoardCard/BoardCard";
import { useMainBoardContext } from "../../context/MainboardContext";
import { BoardContextType } from "../../context/MainboardContext";

export default function MainBoard() {
  const { mainBoard, removeCard, removeAllCards, removeLastCard }:BoardContextType = useMainBoardContext();

  const speak = () => {
    const phrase = mainBoard.map((card) => card.name).join(" ");

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(phrase));
  }  

  return (
    <div className="MainBoard">
      <div className="flex flex-col shrink-0 w-[15%] max-w-12 justify-around h-full">
        <button 
          className="w-full rounded-full aspect-square" 
          onClick={removeLastCard} 
          aria-label="Remover último card"
          style={{
            backgroundColor: 'rgba(144, 238, 144, 0.3)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(144, 238, 144, 0.2)'
          }}
        >↩</button>
        <button
          className="w-full rounded-full aspect-square" 
          onClick={() => removeAllCards()}
          aria-label="Remover todos os cards"
          style={{
            backgroundColor: 'rgba(144, 238, 144, 0.3)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(144, 238, 144, 0.2)'
          }}
        >🗑️</button>
      </div>
      <div 
        className="flex h-full grow overflow-x-scroll overflow-y-visible scrollbar-hide gap-2 p-1 items-center justify-start"
        style={{
          backgroundColor: 'rgba(144, 238, 144, 0.3)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(144, 238, 144, 0.2)',
          borderRadius: '8px'
        }}
      >
        {mainBoard.map((card) => {
          return <BoardCard key={card.tempId} card={card} removeCard={() => removeCard(card.tempId)} />
        })}
      </div>
      <div className="max-w-12 shrink-0 w-[15%]">
        <button 
          className="w-full rounded-full aspect-square" 
          onClick={speak}
          style={{
            backgroundColor: 'rgba(144, 238, 144, 0.3)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(144, 238, 144, 0.2)'
          }}
        >🔊</button>
      </div>
    </div>
  );
}