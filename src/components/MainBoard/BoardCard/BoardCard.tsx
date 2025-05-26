import { CardData } from "../../Content/Card/Card";
import "./BoardCard.css";

interface BoardCardProps {
  card: CardData;
  removeCard: () => void;
}

export default function BoardCard({ card, removeCard }: BoardCardProps) {
  const { name, image } = card;

  return (
    <div className="boardCard overflow-hidden" onClick={removeCard}>
        <img src={image} alt={name} className="flex relative h-[80%] w-[100%] aspect-square pointer-events-none" />
        <div className="flex justify-center items-center h-[20%]">
          <span className="pointer-events-none">{name}</span>
        </div>
    </div>
  );
}
