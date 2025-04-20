import "./MainBoard.css";
import BoardCard from "./BoardCard/BoardCard";
import { useMainBoardContext } from "../../context/MainboardContext";
import { BoardContextType } from "../../context/MainboardContext";

export default function MainBoard() {
  const { mainBoard, removeCard, removeAllCards, removeLastCard }: BoardContextType =
    useMainBoardContext();

  const speak = () => {
    const phrase = mainBoard.map((card) => card.name).join(" ");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(phrase));
  };

  return (
    <div className="MainBoard">
      <div className="flex flex-col shrink-0 w-[15%] max-w-[48px] justify-around h-full">
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

      <div className="max-w-[48px] shrink-0 w-[15%]">
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