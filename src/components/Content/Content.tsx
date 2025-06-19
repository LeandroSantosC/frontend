import { useEffect, useRef, useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardContext } from "../../context/CardContext";
import Card from "./Card/Card";
import './Board/Board.css'
import { AnimatePresence, motion } from "framer-motion";
import { closestCenter, DndContext, MeasuringStrategy, useSensor, useSensors, DragEndEvent, PointerSensor } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Button, Skeleton, Tab, Tabs } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "../../context/AuthContext";
import Board from "./Board/Board";
import { useBoardContext } from "../../context/BoardContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function Content() {
  const [tab, setTab] = useState<'cards' | 'boards'>('cards');
  const { editMode, categorySelected, search } = useToolsContext();
  const { cards, setCards, loadingCards, newCard, isPublicCard, setCardEdit, editingCard } = useCardContext();
  const { boards, setBoards, loadingBoards, newBoard, editingBoard, setBoardEdit } = useBoardContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const CardEditref = useRef<HTMLDivElement>(null);
  const BoardEditref = useRef<HTMLDivElement>(null);
  const { user, userLayout } = useAuth();
  const navigate = useNavigate();
  const sensors = useSensors(
    useSensor(PointerSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    }
    })
  );

  useEffect(() => {
    if (isPublicCard && tab === 'boards') {
      setTab('cards');
    }
  }, [isPublicCard, tab]);

  let loadingSnack;
  if (loadingCards && tab == 'cards') {
    loadingSnack = enqueueSnackbar("Carregando!", { variant: "info", persist: true, preventDuplicate: true });
  }
  else {
    closeSnackbar(loadingSnack);
  }

  if (loadingBoards && tab == 'boards') {
    loadingSnack = enqueueSnackbar("Carregando!", { variant: "info", persist: true, preventDuplicate: true });
  }
  else {
    closeSnackbar(loadingSnack);
  }


  function handleDragEnd<T extends { id: string; position: number }>(
  event: DragEndEvent,
  items: T[],
  setItems: React.Dispatch<React.SetStateAction<T[]>>
) {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const oldIndex = items.findIndex(item => item.id === active.id);
  const newIndex = items.findIndex(item => item.id === over.id);

  if (oldIndex === -1 || newIndex === -1) return;

  setItems(() => {
    const updated = arrayMove(items, oldIndex, newIndex);
    return updated.map((item, index) => ({ ...item, position: index }));
  });
}

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
    <div className="flex flex-col items-center w-full pt-1 h-full overflow-auto">
      <Tabs value={tab} onChange={(_, newValue) => {
        if (!user && newValue === 'boards') {
          navigate('/?login=true');
          return;
        }
        setTab(newValue)
      }} centered>
        <Tab label={isPublicCard ? "Botões Públicos" : "Botões"} value='cards'/>
        {!isPublicCard && <Tab label={
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            Pranchas{user ? '' : <Icon icon="solar:lock-bold" width={16} />}
          </span>} value='boards' />}
      </Tabs>
      {tab === "cards" && (
        <>
          <div className="flex w-full overflow-x-visible touch-pan-y scrollbar-hide p-2 overflow-y-auto flex-row justify-evenly gap-2 flex-wrap">
            <AnimatePresence>
              {editMode ? (
                <motion.div
                  ref={CardEditref}
                  layout
                  key="AddButton"
                  style={{ ...userLayout.card, left: 0 }}
                  initial={{ width: 0 }}
                  animate={{ ...userLayout.card }}
                  exit={{ width: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.3
                  }}
                  onClick={() => setCardEdit(newCard, CardEditref)}
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
                onDragEnd={(event) => handleDragEnd(event, cards, setCards)}
                autoScroll={{ threshold: { x: 0, y: 0.1 } }}
              >
                <SortableContext items={filteredCards.map((card) => card.id)} strategy={rectSortingStrategy}>
                  {
                    filteredCards.length > 0 ?
                      filteredCards.map((card) => (
                        <Card key={card.id} card={card} />
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
              : Array.from({ length: 30 }).map((_, index) => (
                <Skeleton className="card" key={index} variant="rounded" width="clamp(80px, calc(33.3% - 4%), 130px)" height="auto" sx={{ aspectRatio: 1 / 1.25, borderRadius: "16px" }} />
              ))
            }
          </div>
        </>)}
      {tab === "boards" &&
        <>
          <div className="flex w-full touch-auto grow-0 overflow-x-visible scrollbar-hide p-2 overflow-y-auto flex-row justify-start gap-2 flex-wrap">
            <AnimatePresence>
              {editMode ? (
                <motion.div
                  ref={BoardEditref}
                  layout
                  key="AddBoard"
                  className="board"
                  style={{ left: 0, ...userLayout.board }}
                  initial={user?.layoutScale?.board == 1 ? { width: '', height: 0 } : { width: 0, height: '' }}
                  animate={{ ...userLayout.board }}
                  exit={user?.layoutScale?.board == 1 ? { width: '', height: 0 } : { width: 0, height: '' }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.3
                  }}
                  onClick={() => setBoardEdit(newBoard, BoardEditref)}
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
                onDragEnd={(event) => handleDragEnd(event, boards, setBoards)}
                autoScroll={{ threshold: { x: 0, y: 0.1 } }}
              >
                <SortableContext items={filteredBoards.map((board) => board.id)} strategy={rectSortingStrategy}>
                  {
                    filteredBoards.length > 0 ?
                      filteredBoards.map((board) => (
                        <Board key={board.id} board={board} />
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
              :
              Array.from({ length: 30 }).map((_, index) => (
                <Skeleton className="card" key={index} variant="rounded" width="clamp(80px, calc(33.3% - 4%), 130px)" height="auto" sx={{ aspectRatio: 1 / 1.25, borderRadius: "16px" }} />
              ))
            }
          </div>
        </>
      }
    </div>
  );
}

export default Content;
