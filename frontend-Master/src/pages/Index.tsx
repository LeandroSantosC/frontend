import Header from "../components/Header/Header"
// import Board from "../components/Board";
import Tools from "../components/Tools/Tools"
import Menu from "../components/Menu";
import Content from "../components/Content/Content";
import { useState, useEffect } from "react";
import { CardData } from "../components/Content/Card/Card";
import MainBoard from "../components/MainBoard/MainBoard";
import { MainBoardProvider } from "../context/MainboardContext";
import { ToolsProvider } from "../context/ToolsContext";
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
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
  };

  const categories = cards.map((card) => card.category).filter((category, index, self) => self.findIndex((t) => t.id === category.id) === index);

  // const boardButtons = [
  //   { id: 1, text: "BoardBtn 1" },
  //   { id: 2, text: "BoardBtn 2" },
  // ];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header setMenuOpen={setMenuOpen} />
      <MainBoardProvider>
        <MainBoard />
        <ToolsProvider>
          <Tools categories={categories} />
          <Content cards={cards} onCardDelete={handleCardDelete} />
        </ToolsProvider>
      </MainBoardProvider>
      {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
    </div>
  );
}