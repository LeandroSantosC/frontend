import { useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardContext } from "../../context/CardContext";
import Card, { CardData } from "./Card/Card";
import CardEditor from "./Card/CardEditor";
import { AnimatePresence } from "framer-motion";
import { closestCenter, DndContext, MeasuringStrategy, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";


function Content() {
  const [tab, setTab] = useState(true);
  const { editMode, categorySelected, search } = useToolsContext();
  const { cards, setCards } = useCardContext();
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      delay: 250, // tempo em milissegundos (0.25s)
      tolerance: 5, // distância mínima para considerar movimento
    },
  }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = cards.findIndex((card) => card.id === active.id);
      const newIndex = cards.findIndex((card) => card.id === over.id);
      setCards(() => {
        const updatedCards = arrayMove(cards, oldIndex, newIndex);
        return updatedCards.map((card, index) => ({ ...card, position: index }));
      });
    }
  };

  const handleEdit = (card: CardData, rect: DOMRect) => {
    setEditingCard(card);
    setCardRect(rect);
  };

  const filteredCards = cards
    .filter((card) => card.category.name === categorySelected || categorySelected === "tudo")
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()))
    .filter((card) => card !== editingCard)
    .filter((card) => editMode || card.visible );

  return (
    <div className="flex flex-col items-center w-full pt-1 h-[67%] overflow-hidden">
      <div className="flex gap-4 h-[7%] grow-0 shrink-0 bg-amber-300 w-full justify-center">
        <button className={`flex h-full text-[150%] text-center align-middle font-bold ${tab ? "bg-blue-500 text-white" : "bg-gray-300"} rounded-md`} onClick={() => setTab(true)}>Botões</button>
        <button className={`flex h-full text-[150%] text-center align-middle font-bold ${!tab ? "bg-blue-500 text-white" : "bg-gray-300"} rounded-md`} onClick={() => setTab(false)}>Pranchas</button>
      </div>
      {tab &&
        <>
          <div className="flex grow-0 overflow-x-hidden scrollbar-hide pb-4 pt-2 overflow-y-auto flex-row w-full justify-evenly gap-2 flex-wrap">
          <DndContext sensors={sensors}
          measuring={{droppable: {
            strategy: MeasuringStrategy.Always,
          }}}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          autoScroll={{ threshold: { x: 0, y: 0.1 } }}
          >
            <SortableContext items={filteredCards.map((card) => card.id)} strategy={rectSortingStrategy}>
                {filteredCards.map((card) => (
                  <Card key={card.id} card={card} onEdit={handleEdit} />
                  ))}
            </SortableContext>
          </DndContext>
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
        </>
      }
      {!tab &&
        <div>
        </div>
      }
    </div>
  );
}

export default Content;
