import React, { useState } from 'react';
import './BoardCard.css';

interface BoardCardProps {
  id: string;
  name: string;
  image: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ id, name, image }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
    e.currentTarget.src = 'https://via.placeholder.com/150';
  };

  return (
    <div className="boardCard">
      <div className="image-container">
        <img 
          src={imgError ? 'https://via.placeholder.com/150' : image} 
          alt={name}
          onError={handleImageError}
        />
      </div>
      <div className="name">{name}</div>
    </div>
  );
};

export default BoardCard;
