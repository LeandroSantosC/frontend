import "./MainBoard.css";
import BoardCard from "./BoardCard/BoardCard";
import { useMainBoardContext } from "../../context/MainboardContext";
import { BoardContextType } from "../../context/MainboardContext";
import { Icon } from "@iconify/react";


export default function MainBoard() {
  const { mainBoard, removeCard, removeAllCards, removeLastCard }:BoardContextType = useMainBoardContext();

  const speak = () => {
    const phrase = mainBoard.map((card) => card.name).join(" ");

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(phrase));
  }  

  return (
    <div className="MainBoard">
      <div className="flex flex-col shrink-0 w-[12%] max-w-10 justify-around h-full">
        <button className="bg-red-500 w-full rounded-full aspect-square text-white" onClick={() => removeLastCard()}><Icon icon="solar:backspace-bold" width="100%" height="70%" /></button>
        <button className="bg-red-500 w-full rounded-full aspect-square text-white" onClick={() => removeAllCards()} ><Icon icon="solar:trash-bin-trash-bold" width="100%" height="70%" /></button>
      </div>
      <div className="flex h-full grow overflow-x-scroll overflow-y-visible scrollbar-hide gap-2 p-1">
        {mainBoard.map((card) => {
          return <BoardCard key={card.tempId} card={card} removeCard={() => removeCard(card.tempId)} />
        })}
      </div>
            <div className="flex flex-col shrink-0 w-[12%] max-w-10 justify-around h-full">
        <button className="bg-blue-500 w-full rounded-full text-center justify-center items-center align-middle aspect-square text-white" onClick={speak}><Icon icon="solar:clipboard-add-bold" width="100%" height="70%" /></button>
        <button className="bg-blue-500 w-full rounded-full text-center justify-center items-center align-middle aspect-square text-white" onClick={speak}><Icon icon="solar:play-bold" width="100%" height="60%" /></button>
      </div>
    </div>
  );
}