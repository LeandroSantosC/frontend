import { useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardContext } from "../../context/CardContext";
import Card from "./Card/Card";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";


function Content() {
  const [tab, setTab] = useState(true);
  const { categorySelected, search } = useToolsContext();
  const { cards } = useCardContext();

  const filteredCards = cards
    .filter((card) => card.category.name === categorySelected || categorySelected === "tudo")
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col items-center w-full pt-1 h-[67%] overflow-visible">
      <div className="flex gap-4 h-[7%] grow-0 shrink-0 bg-amber-300 w-full justify-center">
        <button className={`flex h-full text-[150%] text-center align-middle font-bold ${tab ? "bg-blue-500 text-white":"bg-gray-300"} rounded-md`} onClick={() => setTab(true)}>Botões</button>
        <button className={`flex h-full text-[150%] text-center align-middle font-bold ${!tab ? "bg-blue-500 text-white":"bg-gray-300"} rounded-md`} onClick={() => setTab(false)}>Pranchas</button>
      </div>
      <LayoutGroup>
        {tab && <div className="flex grow-0 overflow-x-visible scrollbar-hide pb-4 pt-2 overflow-y-auto flex-row w-full justify-evenly gap-2 flex-wrap">
          {filteredCards.map((card) => ( (categorySelected === card.category.name || categorySelected === "tudo") && card.name.toLowerCase().includes(search.toLowerCase()) ?
            <Card card={card} />
            : "" ))}
        </div>}
      </LayoutGroup>
      {!tab && 
      <div>
      </div>
      }
    </div>
  );
}

export default Content;
