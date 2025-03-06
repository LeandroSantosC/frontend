import "./BoardCard.css";

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

  return (
    <div className="boardCard overflow-hidden" onClick={removeCard}>
        <img src={img} alt={name} className="flex relative h-full w-[100%] aspect-square pointer-events-none" />
        <div className="flex justify-center">
          <span className="pointer-events-none">{name}</span>
        </div>
    </div>
  );
}
