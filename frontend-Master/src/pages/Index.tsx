import Header from "../components/Header/Header";
import Tools from "../components/Tools/Tools";
import Menu from "../components/Menu";
import Content from "../components/Content/Content";
import { useState, useEffect } from "react";
import { CardData } from "../components/Content/Card/Card";
import MainBoard from "../components/MainBoard/MainBoard";
import { MainBoardProvider } from "../context/MainboardContext";
import { ToolsProvider } from "../context/ToolsContext";
import { CardSizeProvider } from "../context/CardSizeContext";
import { getCards } from "../services/CardAPI";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const result = await getCards();
      if (result.success) {
        setCards(result.response?.data || []);
      }
    };

    fetchCards();
  }, []);

  const handleCardDelete = (cardId: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const handleCardReorder = (newOrder: CardData[]) => {
    setCards(newOrder);
  };

  const categories = cards
    .map((card) => card.category)
    .filter(
      (category, index, self) =>
        self.findIndex((t) => t.id === category.id) === index
    );

  return (
    <div
      className="flex flex-col min-h-screen w-full overflow-x-hidden"
      style={{ boxSizing: "border-box" }}
    >
      <CardSizeProvider>
        <Header setMenuOpen={setMenuOpen} setSettingsOpen={() => {}} />
        <MainBoardProvider>
          <MainBoard />
          <ToolsProvider>
            <Tools categories={categories} />
            <Content
              cards={cards}
              onCardDelete={handleCardDelete}
              onReorder={handleCardReorder}
              className="flex-grow overflow-y-auto"
            />
          </ToolsProvider>
        </MainBoardProvider>
        {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      </CardSizeProvider>
    </div>
  );
}