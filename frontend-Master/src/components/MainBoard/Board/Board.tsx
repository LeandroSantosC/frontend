import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './Board.css';

interface BoardProps {
  cards: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

const Board: React.FC<BoardProps> = ({ cards }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <BoardCard
          key={card.id}
          id={card.id}
          name={card.name}
          imageUrl={card.imageUrl}
        />
      ))}
    </div>
  );
};

export default Board; 