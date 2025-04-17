import React, { useState } from 'react';
import './BoardCard.css';

interface BoardCardProps {
  id: string;
  name: string;
  imageUrl: string;
}

const BoardCard: React.FC<BoardCardProps> = ({ id, name, imageUrl }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImgError(true);
    e.currentTarget.src = 'https://via.placeholder.com/150';
  };

  return (
    <div className="boardCard">
      <div className="image-container">
        <img 
          src={imgError ? 'https://via.placeholder.com/150' : imageUrl} 
          alt={name}
          onError={handleImageError}
        />
      </div>
      <div className="name">{name}</div>
    </div>
  );
};

export default BoardCard;
