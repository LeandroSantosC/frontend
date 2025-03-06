import "./MainBoard.css";
import { BoardCardData } from "./BoardCard/BoardCard";
import BoardCard from "./BoardCard/BoardCard";

interface MainBoardProps {
  mainBoard: BoardCardData[];
  setMainBoard: (value: BoardCardData[] | ((prevCards: BoardCardData[]) => BoardCardData[])) => void;
}

export default function MainBoard({ mainBoard, setMainBoard }: MainBoardProps) {

  const removeCard = (tempId: string) => {
    setMainBoard((prevCards) => prevCards.filter((card) => card.tempId !== tempId));
  }

  const removeLastCard = () => {
    setMainBoard((prevCards) => prevCards.slice(0, -1));
  }

  const removeAllCards = () => {
    setMainBoard([]);
  }

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