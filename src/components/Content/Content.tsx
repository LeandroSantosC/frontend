import { useRef, useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardContext } from "../../context/CardContext";
import Card from "./Card/Card";
import CardEditor, { EditCardData } from "./Card/CardEditor";
import { AnimatePresence, motion } from "framer-motion";
import { closestCenter, DndContext, MeasuringStrategy, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Button, Skeleton, Tab, Tabs } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Board from "./Board/Board";


const board: BoardData = {
  id: "board",
  name: "board",
  visible: true,
  cards: [
    {
      id: "card1",
      name: "Card 1",
      image: "",
      sound: undefined,
      visible: true,
      position: 0,
      category: {
        id: undefined,
        name: ""
      }
    },
    {
      id: "card2",
      name: "Card 2",
      image: "",
      sound: undefined,
      visible: true,
      position: 1,
      category: {
        id: undefined,
        name: ""
      }
    }
  ]
}


function Content() {
  const [tab, setTab] = useState<'cards' | 'boards'>('cards');
  const { editMode, categorySelected, search } = useToolsContext();
  const { cards, setCards, loadingCards, newCard, CardSnack, isPublicCard } = useCardContext();
  const [editingCard, setEditingCard] = useState<EditCardData | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const CardEditref = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      delay: 250, // tempo em milissegundos (0.25s)
      tolerance: 5, // distância mínima para considerar movimento
    },
  }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = cards.findIndex((card) => card.id === active.id);
      const newIndex = cards.findIndex((card) => card.id === over?.id);
      setCards(() => {
        const updatedCards = arrayMove(cards, oldIndex, newIndex);
        return updatedCards.map((card, index) => ({ ...card, position: index }));
      });
    }
  };

  const handleEdit = (card: EditCardData, ref: React.RefObject<HTMLDivElement | null>) => {
    if(user){
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setEditingCard(card);
        setCardRect(rect);
      }
    }
    else{
      navigate("/?login=true");
    }
  };

  const filteredCards = cards
    .filter((card) => categorySelected.some((cat) => cat.name === card.category.name) || categorySelected.length === 0)
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()))
    .filter((card) => card !== editingCard)
    .filter((card) => editMode || card.visible);

  return (
    <div className="flex flex-col items-center w-full pt-1 h-[69%] overflow-visible">
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
        <Tab label={isPublicCard ? "Botões Públicos" : "Botões"} value='cards'/>
        {!isPublicCard && <Tab label="Pranchas" value='boards'/>}
      </Tabs>
      {tab === "cards" && (
        <>
          <div className="flex w-full grow-0 overflow-x-visible scrollbar-hide p-2 overflow-y-auto flex-row justify-evenly gap-2 flex-wrap">
            <AnimatePresence>
              {editMode ? (
                <motion.div
                  ref={CardEditref}
                  layout
                  key="AddButton"
                  style={{ width: 'clamp(80px, calc(33.3% - 4%), 130px)', aspectRatio: 1 / 1.25, left: 0 }}
                  initial={{ width: 0 }}
                  animate={{ width: 'clamp(80px, calc(33.3% - 4%), 130px)' }}
                  exit={{ width: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.3
                  }}
                  onClick={() => handleEdit(newCard, CardEditref)}
                >
                  <Button className="card"
                    style={{ backgroundColor: "oklch(0.623 0.214 259.815)", borderRadius: "16px", width: '100%', aspectRatio: 'auto', height: '100%' }}
                  >
                    <Icon icon="solar:add-circle-bold" className="flex relative w-full h-[50%] rounded-inherit pointer-events-none text-white" />
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {!loadingCards ? (cards.length > 0 ?
              <DndContext sensors={sensors}
                measuring={{
                  droppable: {
                    strategy: MeasuringStrategy.Always,
                  }
                }}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                autoScroll={{ threshold: { x: 0, y: 0.1 } }}
              >
                <SortableContext items={filteredCards.map((card) => card.id)} strategy={rectSortingStrategy}>
                  {
                    filteredCards.length > 0 ?
                      filteredCards.map((card) => (
                        <Card key={card.id} card={card} onEdit={handleEdit} />
                      )) :
                      <div className="flex h-[50vh] w-full justify-center items-center text-[2.5vh] flex-col gap-5 font-bold">
                        <img src="sadshake.gif" width={'150vh'}></img>
                        <span>Nenhuma correspondência encontrada</span>
                      </div>
                  }
                </SortableContext>
              </DndContext>
              : editMode ? null : (<div className="flex absolute h-[50vh] w-full justify-center items-center text-[2.5vh] flex-col gap-5 font-bold">
                <img src="sadshake.gif" width={'150vh'}></img>
                <span>Você não tem nenhum card</span>
              </div>)
            )
              : Array.from({ length: 30 }).map(() => (
                <Skeleton className="card" variant="rounded" width="clamp(80px, calc(33.3% - 4%), 130px)" height="auto" sx={{ aspectRatio: 1 / 1.25, borderRadius: "16px" }} />
              ))
            }
          </div>
          <AnimatePresence onExitComplete={() => setEditingCard(null)}>
            {editingCard && cardRect && (
              <CardEditor
                card={editingCard}
                cardRect={cardRect}
                closeEditor={() => setCardRect(null)}
              />
            )}
          </AnimatePresence>
          {CardSnack()}
        </>)}
      {tab === "boards" &&
        <div className="flex w-full grow-0 overflow-x-visible scrollbar-hide p-2 overflow-y-auto flex-row justify-evenly gap-2 flex-wrap">
          <Board board={board}/>
          <Board board={board}/>
          <Board board={board}/>
          <Board board={board}/>
          <Board board={board}/>
          <Board board={board}/>
        </div>
      }
    </div>
  );
}

export default Content;
