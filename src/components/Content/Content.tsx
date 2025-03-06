import Card, { CardData } from "./Card/Card";
import { BoardCardData } from "../MainBoard/BoardCard/BoardCard";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ContentProps {
  cards: CardData[];
  editMode: boolean;
  category: string;
  search: string;
  setMainBoard: (value: BoardCardData[] | ((prevCards: BoardCardData[]) => BoardCardData[])) => void;
}

function Content({ cards, editMode, category, setMainBoard, search }: ContentProps) {
  const [tab, setTab] = useState(true);

  const addCardOnMainBoard = (card: CardData) => {
    const newBoardCard: BoardCardData = {
      id: card.id,
      tempId: uuidv4(),
      name: card.name,
      img: card.img,
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(card.name));
    setMainBoard((prevCards: BoardCardData[]) => [...prevCards, newBoardCard]);
  };


  return (
    <div className="flex flex-col items-center w-full p-2 gap-2 h-[67%] overflow-visible">
      <div className="flex gap-4 h-[8%] w-full justify-center">
        <button className={`${tab ? "bg-blue-500 text-white":"bg-gray-300"} rounded-md`} onClick={() => setTab(true)}>Botões</button>
        <button className={`${!tab ? "bg-blue-500 text-white":"bg-gray-300"} rounded-md`} onClick={() => setTab(false)}>Pranchas</button>
      </div>
      {tab && <div className="flex grow-0 overflow-x-visible scrollbar-hide pb-4 pt-2 overflow-y-auto flex-row w-full justify-evenly gap-2 flex-wrap">
        {cards.map((card) => ( (category === card.category.id.toString() || category === "Tudo") && card.name.toLowerCase().includes(search.toLowerCase()) ?
          <Card card={card} editMode={editMode} addCardOnMainBoard={() => addCardOnMainBoard(card)}/>
        : "" ))}
      </div>}
      {!tab && 
      <div>

      </div>
      }
    </div>
  );
}

export default Content;
