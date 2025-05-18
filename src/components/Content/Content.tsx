import { useRef, useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardContext } from "../../context/CardContext";
import Card from "./Card/Card";
import './Board/Board.css'
import CardEditor, { EditCardData } from "./Card/CardEditor";
import { AnimatePresence, motion } from "framer-motion";
import { closestCenter, DndContext, MeasuringStrategy, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Button, Skeleton, Tab, Tabs, useMediaQuery } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Board, { NewBoardData } from "./Board/Board";
import BoardEditor from "./Board/BoardEditor";
import { useBoardContext } from "../../context/BoardContext";

function Content() {
  const [tab, setTab] = useState<'cards' | 'boards'>('cards');
  const { editMode, categorySelected, search } = useToolsContext();
  const { cards, setCards, loadingCards, newCard, CardSnack, isPublicCard } = useCardContext();
  const { boards, setBoards, loadingBoards, newBoard, BoardSnack } = useBoardContext();
  const [editingCard, setEditingCard] = useState<EditCardData | null>(null);
  const [editingBoard, setEditingBoard] = useState<NewBoardData | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const [boardRect, setBoardRect] = useState<DOMRect | null>(null);
  const CardEditref = useRef<HTMLDivElement>(null);
  const BoardEditref = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      delay: 250, // tempo em milissegundos (0.25s)
      tolerance: 5, // distância mínima para considerar movimento
    },
  }));
  const isCellphone = useMediaQuery('(max-width: 425px)');

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

  const handleDragEndBoard = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = boards.findIndex((board) => board.id === active.id);
      const newIndex = boards.findIndex((board) => board.id === over?.id);
      setBoards(() => {
        const updatedBoards = arrayMove(boards, oldIndex, newIndex);
        return updatedBoards.map((board, index) => ({ ...board, position: index }));
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

  const handleEditBoard = (board: NewBoardData, ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setEditingBoard(board);
      setBoardRect(rect);
    }
    // if(user){
    // }
    // else{
    //   navigate("/?login=true");
    // }
  };

  const filteredCards = cards
    .filter((card) => categorySelected.some((cat) => cat === card.category) || categorySelected.length === 0)
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()))
    .filter((card) => card !== editingCard)
    .filter((card) => editMode || card.visible);

    const filteredBoards = boards
    .filter((board) => board.name.toLowerCase().includes(search.toLowerCase()))
    .filter((board) => board !== editingBoard)
    .filter((board) => editMode || board.visible);

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
                      )) : editMode ? null :
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
      <>
        <div className="flex w-full grow-0 overflow-x-visible scrollbar-hide p-2 overflow-y-auto flex-row justify-start gap-2 flex-wrap">
        <AnimatePresence>
              {editMode ? (
                <motion.div
                  ref={BoardEditref}
                  layout
                  key="AddBoard"
                  className="board"
                  style={{ left: 0 }}
                  initial={{ width: isCellphone ? '' : 0, height: isCellphone ? 0 : '' }}
                  animate={{ width: '', height: ''}}
                  exit={{ width: isCellphone ? '' : 0, height: isCellphone ? 0 : '' }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.3
                  }}
                  onClick={() => handleEditBoard(newBoard, BoardEditref)}
                >
                  <Button className="board"
                    style={{ backgroundColor: "oklch(0.623 0.214 259.815)", width: '100%', aspectRatio: 'auto', height: '100%' }}
                  >
                    <Icon icon="solar:add-circle-bold" className="flex relative w-full h-[50%] rounded-inherit pointer-events-none text-white" />
                  </Button>
                </motion.div>
              ) : null}
          </AnimatePresence>
          {!loadingBoards ? (boards.length > 0 ?
              <DndContext sensors={sensors}
                measuring={{
                  droppable: {
                    strategy: MeasuringStrategy.Always,
                  }
                }}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEndBoard}
                autoScroll={{ threshold: { x: 0, y: 0.1 } }}
              >
                <SortableContext items={filteredBoards.map((board) => board.id)} strategy={rectSortingStrategy}>
                  {
                    filteredBoards.length > 0 ?
                      filteredBoards.map((board) => (
                        <Board key={board.id} board={board} onEdit={handleEditBoard}/>
                      )) : editMode ? null :
                      <div className="flex h-[50vh] w-full justify-center items-center text-[2.5vh] flex-col gap-5 font-bold">
                        <img src="sadshake.gif" width={'150vh'}></img>
                        <span>Nenhuma correspondência encontrada</span>
                      </div>
                  }
                </SortableContext>
              </DndContext>
              : editMode ? null : (<div className="flex absolute h-[50vh] w-full justify-center items-center text-[2.5vh] flex-col gap-5 font-bold">
                <img src="sadshake.gif" width={'150vh'}></img>
                <span>Você não tem nenhuma prancha</span>
              </div>)
            )
              : Array.from({ length: 30 }).map(() => (
                <Skeleton className="card" variant="rounded" width="clamp(80px, calc(33.3% - 4%), 130px)" height="auto" sx={{ aspectRatio: 1 / 1.25, borderRadius: "16px" }} />
              ))
            }
        </div>
        <AnimatePresence onExitComplete={() => setEditingBoard(null)}>
        {editingBoard && boardRect && (
          <BoardEditor
          board={editingBoard}
          boardRect={boardRect}
          closeEditor={() => setBoardRect(null)}
          />
        )}
      </AnimatePresence>
      {BoardSnack()}
      </>
      }
    </div>
  );
}

export default Content;
