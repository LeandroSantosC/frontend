import Card, { CardData } from "./Card/Card";
import { useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardSize } from "../../context/CardSizeContext";

interface ContentProps {
  cards: CardData[];
}

function Content({ cards }: ContentProps) {
  const { editMode } = useToolsContext();
  const { cardSize } = useCardSize();

  const style = {
    "--card-size": `clamp(80px, calc(${cardSize}% - 1rem), 200px)`
  } as React.CSSProperties;

  return (
    <div
      className="flex flex-wrap gap-4 p-4 justify-center content-start overflow-y-auto"
      style={style}
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} editMode={editMode} />
      ))}
    </div>
  );
}

export default Content;
