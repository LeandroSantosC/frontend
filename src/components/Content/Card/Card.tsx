import CardTools from "./CardTools/CardTools";
import { useEffect, useRef, useState } from "react";
import { useMainBoardContext } from "../../../context/MainboardContext";
import { motion, AnimatePresence, easeInOut, easeIn, easeOut } from 'framer-motion';
import "./Card.css";

export interface CardData {
  id: string;
  name: string;
  img: string;
  isVisible: boolean;
  category: {
    id: string;
    name: string;
  };
}

export interface CardProps {
  card: CardData;
  editMode: boolean;
  addCardOnMainBoard: () => void;
}

function Card({ card, editMode }: CardProps) {
  const { id, name, image } = card;
  const [visible, setVisible] = useState(card.visible);
  const { addCardOnMainBoard } = useMainBoardContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const [isEditing, setEditing] = useState<[boolean, string]>([false, ""]);
  const openEditor = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardRect(rect);
      setEditing([true, cardRef.current.id]);
    }
  };

  const closeEditor = () => {
    setEditing([false, ""]);
    setCardRect(null);
  };

  return (
    <>
      <AnimatePresence>
        {!isEditing[0] && (
          <motion.div
            key={id}
            layoutId={`card-${id}`}
            className="card"
            style={!visible && !editMode ? { display: "none" } : { display: "flex" }}
            layout
            ref={cardRef}
            initial={{ opacity: 0}} 
            animate={{ opacity: 1, transition: { opacity:{delay: 0.23, duration: 0} }}}
            exit={{ opacity: 0, transition:{opacity: {duration: 0}}}}
          >
            <div
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
              id={id}
              isVisible={visible}
              setVisible={setVisible}
              editMode={editMode}
              setEditing={openEditor}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditing[0] && cardRect && (
          <>
          <motion.div
            className="absolute top-0 left-0 right-0 bottom-0 bg-black flex items-center justify-center z-50"
            layoutId={`card-${isEditing[1]}`}
            onClick={closeEditor}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            />
            <motion.div
            style={{ opacity: 1, zIndex: 100 }}
            className="editCard"
            initial={{
              top: cardRect.top,
              left: cardRect.left,
              width: cardRect.width,
              height: cardRect.height,
              position: 'absolute',
            }}
            animate={{
                top: '50%',
                left: '50%',
                width: 'auto',
                height: '80vh',
                transform: 'translate(-50%, -50%)'
              }}
              exit={{
                top: cardRect.top,
                left: cardRect.left,
                width: cardRect.width,
                height: cardRect.height,
                transform: 'translate(0, 0)',
                position: 'absolute',
              }}
              transition={{
                duration: 0.3,
                ease: easeInOut
              }}
            >
              <div className="flex flex-col items-center h-full w-full">
                <img src={image} alt={name} className="flex relative h-full w-full rounded-inherit pointer-events-none" />
                <div className="flex justify-center items-center h-[15%]">
                  <span className="pointer-events-none overflow-hidden text-center text-nowrap whitespace-nowrap text-[300%]">{name}</span>
                </div>
              </div>
            </motion.div>
        </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Card;
