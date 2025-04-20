import Card, { CardData } from "./Card/Card";
import { useState, useEffect } from "react";
import { useToolsContext } from "../../context/ToolsContext";
import { useCardSize } from "../../context/CardSizeContext";

interface ContentProps {
  cards: CardData[];
  onCardDelete: (cardId: number) => void;
  className?: string;
}

function Content({ cards, onCardDelete, className = "" }: ContentProps) {
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

  return (
    <div
      className={`flex flex-wrap gap-4 p-4 justify-center content-start overflow-y-auto ${className}`}
      style={style}
    >
      {filteredCards.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          editMode={editMode}
          onDelete={() => onCardDelete(card.id)}
        />
      ))}
    </div>
  );
}

export default Content;