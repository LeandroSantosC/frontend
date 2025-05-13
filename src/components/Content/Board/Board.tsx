import { useRef } from "react";
import { useMainBoardContext } from "../../../context/MainboardContext";
import "./Board.css";
import { useToolsContext } from "../../../context/ToolsContext";
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useRipple from "use-ripple-hook";
import { useAuth } from "../../../context/AuthContext";
import { CardData } from "../Card/Card";
import { v4 as uuidv4 } from "uuid";
import BoardTools from "./BoardTools/BoardTools";

export interface BoardData {
  id: string;
  name: string;
  visible?: boolean;
  position?: number;
  cards: CardData[];
}

export interface NewBoardData {
  name: string;
  cards: CardData[];
}

export interface BoardProps {
  board: BoardData;
}

function Board({ board }: { board: BoardData }) {
  const { editMode } = useToolsContext();
  const { user } = useAuth();
  const { id, name, cards, visible } = board;
  const { addCardOnMainBoard } = useMainBoardContext();
  const [ripple, event] = useRipple({ color: "rgba(255, 255, 255, .5)" });

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current) {
      onEdit(board, ref); // chama o handler do Content
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
    // width: user?.layoutScale ? `clamp(${240/user.layoutScale}px, calc(${1/user.layoutScale * 100}% - 3%), ${390/user.layoutScale}px)` : undefined,
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
        className={isDragging ? "board drag" : "board"}
        style={{ ...style }}
      >
        <div
          {...listeners}
          className="flex flex-col items-center h-full w-full m-0 p-0"
          style={!visible && editMode ? { opacity: 0.3 } : {}}
          onClick={() => cards.map(card => addCardOnMainBoard(card))}
        >
          <div className="flex flex-row items-center justify-evenly w-full h-[85%] m-0 p-0.5 bg-blue-500 overflow-ellipsis gap-1">
            {cards.map((card) => (
              <div className="aspect-[1/1.25] h-full w-auto bg-white rounded-xl">
                <img src={card.image} alt={card.name} className="flex relative h-[80%] w-full aspect-square pointer-events-none" />
                <div className="flex justify-center">
                  <span className="pointer-events-none">{card.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center h-[15%] w-fit">
            <span className="pointer-events-none overflow-hidden text-center text-nowrap whitespace-nowrap font-bold text-[110%]">{name}</span>
          </div>
        </div>
        <BoardTools
          board={board}
          isVisible={visible ?? true}
          setEditing={handleClick}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default React.memo(Board);
