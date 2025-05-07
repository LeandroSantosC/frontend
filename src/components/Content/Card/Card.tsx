import CardTools from "./CardTools/CardTools";
import { useRef } from "react";
import { useMainBoardContext } from "../../../context/MainboardContext";
import "./Card.css";
import { useToolsContext } from "../../../context/ToolsContext";
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useRipple from "use-ripple-hook";

export interface CardData {
  id: string;
  name: string;
  image: string;
  sound?: string;
  visible: boolean;
  position: number;
  category: {
    id?: string;
    name: string;
  };
}

export interface CardProps {
  card: CardData;
}

function Card({ card, onEdit }: { card: CardData, onEdit: (card: CardData, ref:React.RefObject<HTMLDivElement | null>) => void }) {
  const { editMode } = useToolsContext();
  const { id, name, image, visible } = card;
  const { addCardOnMainBoard } = useMainBoardContext();
  const [ripple, event] = useRipple({ color: "rgba(255, 255, 255, .5)" });

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current) {
      onEdit(card, ref); // chama o handler do Content
    }
  };

  function animateLayoutChanges(args: Parameters<AnimateLayoutChanges>[0]): ReturnType<AnimateLayoutChanges> {
    if (args.isSorting || args.wasDragging) {
      return defaultAnimateLayoutChanges(args);

    }
    return true;
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    animateLayoutChanges,
    disabled: !editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    zIndex: isDragging ? 100 : undefined,
  };

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        {...attributes}
        ref={(node) => {
          setNodeRef(node);
          ref.current = node;
          ripple.current = node;
        }}
        onPointerDown={event}
        className={isDragging ? "card drag" : "card"}
        style={{ ...style }}
      >
        <div
          {...listeners}
          className="flex flex-col items-center h-full w-full m-0 p-0"
          style={!visible && editMode ? { opacity: 0.3 } : {}}
          onClick={() => addCardOnMainBoard(card)}
        >
          <img src={image} alt={name} className="flex relative h-full w-full rounded-inherit pointer-events-none" />
          <div className="flex justify-center items-center h-[15%] w-fit">
            <span className="pointer-events-none overflow-hidden text-center text-nowrap whitespace-nowrap font-bold text-[110%]">{name}</span>
          </div>
        </div>
        <CardTools
          card={card}
          isVisible={visible}
          setEditing={handleClick}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default React.memo(Card);
