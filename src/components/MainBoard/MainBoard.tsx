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
        <button className="bg-blue-500 w-full rounded-full aspect-square" onClick={() => removeLastCard()}>▶</button>
        <button className="bg-blue-500 w-full rounded-full aspect-square" onClick={() => removeAllCards()} >▶</button>
      </div>
      <div className="flex h-full grow overflow-x-scroll overflow-y-visible scrollbar-hide gap-2 p-1">
        {mainBoard.map((card) => {
          return <BoardCard key={card.tempId} card={card} removeCard={() => removeCard(card.tempId)} />
        })}
      </div>
      <div className="max-w-12 shrink-0 w-[15%]">
        <button className="bg-blue-500 w-full rounded-full aspect-square" onClick={speak}>▶</button>
      </div>
    </div>
  );
}