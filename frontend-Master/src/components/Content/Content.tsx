import Card, { CardData } from "./Card/Card";
import { useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";

interface ContentProps {
  cards: CardData[];
}

function Content({ cards }: ContentProps) {
  const [tab, setTab] = useState(true);
  const { category, search, editMode } = useToolsContext();

  return (
    <div className="flex flex-col items-center w-full p-2 gap-2 h-[67%] overflow-visible">
      <div className="flex gap-4 h-[8%] w-full justify-center">
        <button className={`${tab ? "bg-blue-500 text-white":"bg-gray-300"} rounded-md`} onClick={() => setTab(true)}>Botões</button>
        <button className={`${!tab ? "bg-blue-500 text-white":"bg-gray-300"} rounded-md`} onClick={() => setTab(false)}>Pranchas</button>
      </div>
      {tab && <div className="flex grow-0 overflow-x-visible scrollbar-hide pb-4 pt-2 overflow-y-auto flex-row w-full justify-evenly gap-2 flex-wrap">
        {cards.map((card) => ( (category === card.category.name || category === "" || category === "Tudo") && card.name.toLowerCase().includes(search.toLowerCase()) ?
          <Card card={card} editMode={editMode} />
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
