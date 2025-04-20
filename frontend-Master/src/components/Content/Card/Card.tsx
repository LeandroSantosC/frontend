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

interface CardProps {
  card: CardData;
  editMode: boolean;
  onDelete: () => void;
}

function Card({ card, editMode, onDelete }: CardProps) {
  const { name, image } = card;
  const [visible, setVisible] = useState(card.visible);
  const [imgError, setImgError] = useState(false);
  const { addCardOnMainBoard } = useMainBoardContext();

  const handleImageError = () => {
    console.error('Error loading image:', image);
    setImgError(true);
  };

  return (
    <div className="card" style={!visible && !editMode ? { display: "none" } : { display: "flex" }}>
      <div 
        className="flex flex-col items-center w-full h-full" 
        style={!visible && editMode ? { opacity: 0.3 } : {}}
        onClick={() => addCardOnMainBoard(card)}
      >
        {imgError ? (
          <div className="flex items-center justify-center h-full w-full bg-gray-200">
            <span className="text-gray-500">Imagem não disponível</span>
          </div>
        ) : (
          <img 
            src={image} 
            alt={name} 
            className="flex relative h-full w-full aspect-square pointer-events-none object-cover" 
            onError={handleImageError}
          />
        )}
        <div className="flex justify-center">
          <span className="pointer-events-none">{name}</span>
        </div>
      </div>
      <CardTools isVisible={visible} setVisible={setVisible} editMode={editMode} onDelete={onDelete} />
    </div>
  );
}
export default Card;

