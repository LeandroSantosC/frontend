import Card, { CardData } from "./Card/Card";
import { useState, useEffect } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardSize } from "../../context/CardSizeContext";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ContentProps {
  cards: CardData[];
  onCardDelete: (cardId: number) => void;
  className?: string;
  onReorder?: (newOrder: CardData[]) => void;
}

function Content({ cards, onCardDelete, className = "", onReorder }: ContentProps) {
  const { editMode, category, search } = useToolsContext();
  const { cardSize } = useCardSize();
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);

  // Calcular o tamanho do cartão com base no valor do cardSize
  const calculatedSize = Math.max(80, Math.min(200, cardSize * 2));
  const style = {
    "--card-size": `${calculatedSize}px`
  } as React.CSSProperties;

  // Filtrar cards quando a categoria ou busca mudar
  useEffect(() => {
    // Normalizar o termo de busca
    const searchTerm = search.toLowerCase().trim();
    
    // Filtrar os cards
    const filtered = cards.filter(card => {
      // Verificar categoria
      const matchesCategory = !category || category === "" || card.category.name === category;
      
      // Verificar busca - APENAS se o nome começar com o termo de busca
      const matchesSearch = !searchTerm || card.name.toLowerCase().startsWith(searchTerm);
      
      return matchesCategory && matchesSearch;
    });
    
    // Atualizar o estado com os cards filtrados
    setFilteredCards(filtered);
    
    // Log para depuração
    console.log("Termo de busca:", searchTerm);
    console.log("Cards filtrados:", filtered.map(card => card.name));
  }, [cards, category, search]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newCards = [...filteredCards];
    const draggedCard = newCards[dragIndex];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, draggedCard);
    setFilteredCards(newCards);
    if (onReorder) {
      onReorder(newCards);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`flex flex-wrap gap-4 p-4 justify-center content-start overflow-y-auto ${className}`}
        style={style}
      >
        {filteredCards.map((card, index) => (
          <Card 
            key={card.id} 
            card={card} 
            index={index}
            editMode={editMode}
            onDelete={() => onCardDelete(card.id)}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default Content;