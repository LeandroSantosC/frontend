import "./BoardCard.css";
import { useState } from "react";

export interface BoardCardData {
  id: number;
  tempId: string;
  name: string;
  img: string;
}

interface BoardCardProps {
  card: BoardCardData;
  removeCard: () => void;
}

export default function BoardCard({ card, removeCard }: BoardCardProps) {
  const { name, img } = card;
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    console.error('Error loading image:', img);
    setImgError(true);
  };

  return (
    <div className="boardCard overflow-hidden" onClick={removeCard}>
      {imgError ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-200">
          <span className="text-gray-500">Imagem não disponível</span>
        </div>
      ) : (
        <img 
          src={img} 
          alt={name} 
          className="flex relative h-full w-[100%] aspect-square pointer-events-none object-cover" 
          onError={handleImageError}
        />
      )}
      <div className="flex justify-center">
        <span className="pointer-events-none">{name}</span>
      </div>
    </div>
  );
}
