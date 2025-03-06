import CardTools from "./CardTools/CardTools";
import { useState } from "react";
import "./Card.css";

export interface CardData {
  id: number;
  name: string;
  img: string;
  isVisible: boolean;
  category: {
    id: number;
    name: string;
  };
}

export interface CardProps {
  card: CardData;
  editMode: boolean;
  addCardOnMainBoard: () => void;
}

function Card({ card, editMode, addCardOnMainBoard }: CardProps) {
  const { name, img, isVisible } = card;
  const [visible, setVisible] = useState(isVisible);


  return (
    <div className="card" style={!visible && !editMode ? { display: "none" } : { display: "flex" }}>
      <div 
      className="flex flex-col items-center w-full h-full" 
      style={!visible && editMode ? { opacity: 0.3 } : {}}
      onClick={addCardOnMainBoard}
      >
        <img src={img} alt={name} className="flex relative h-full w-full aspect-square pointer-events-none" />
        <div className="flex justify-center">
          <span className="pointer-events-none">{name}</span>
        </div>
      </div>
      <CardTools isVisible={visible} setVisible={setVisible} editMode={editMode} />
    </div>
  );
}

export default Card;
