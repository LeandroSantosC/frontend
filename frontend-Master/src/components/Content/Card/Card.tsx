import CardTools from "./CardTools/CardTools";
import { useState, useRef } from "react";
import { useMainBoardContext } from "../../../context/MainboardContext";
import { useDrag, useDrop } from 'react-dnd';
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
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDelete: () => void;
}

function Card({ card, editMode, index, moveCard, onDelete }: CardProps) {
  const { name, image } = card;
  const [visible, setVisible] = useState(card.visible);
  const { addCardOnMainBoard } = useMainBoardContext();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: { id: number; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleClick = (e: React.MouseEvent) => {
    if (!editMode) {
      addCardOnMainBoard(card);
    }
  };

  return (
    <div 
      ref={ref}
      className={`card ${isDragging ? 'opacity-50' : ''}`} 
      style={!visible && !editMode ? { display: "none" } : { display: "flex" }}
      onClick={handleClick}
    >
      <div 
        className="flex flex-col items-center w-full h-full" 
        style={!visible && editMode ? { opacity: 0.3 } : {}}
      >
        <img src={image} alt={name} className="flex relative h-full w-full aspect-square pointer-events-none object-cover" />
        <div className="flex justify-center">
          <span className="pointer-events-none">{name}</span>
        </div>
      </div>
      <CardTools 
        isVisible={visible} 
        setVisible={setVisible} 
        editMode={editMode} 
        onDelete={onDelete}
      />
    </div>
  );
}

export default Card;

