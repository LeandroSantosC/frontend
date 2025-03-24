import CardTools from "./CardTools/CardTools";
import { useState } from "react";
import { useMainBoardContext } from "../../../context/MainboardContext";
import "./Card.css";

export interface CardData {
  id: number;
  name: string;
  image: string;
  sound: string;
  visible: boolean;
  position: number;
  category: {
    id: number;
    name: string;
  };
}

export interface CardProps {
  card: CardData;
  editMode: boolean;
}

function Card({ card, editMode }: CardProps) {
  const { name, image } = card;
  const [visible, setVisible] = useState(card.visible);
  const { addCardOnMainBoard } = useMainBoardContext();

  return (
    <div className="card" style={!visible && !editMode ? { display: "none" } : { display: "flex" }}>
      <div 
      className="flex flex-col items-center w-full h-full" 
      style={!visible && editMode ? { opacity: 0.3 } : {}}
      onClick={() => addCardOnMainBoard(card)}
      >
        <img src={image} alt={name} className="flex relative h-full w-full aspect-square pointer-events-none" />
        <div className="flex justify-center">
          <span className="pointer-events-none">{name}</span>
        </div>
      </div>
      <CardTools isVisible={visible} setVisible={setVisible} editMode={editMode} />
    </div>
  );
}

export default Card;
