import Header from "../components/Header/Header"
// import Board from "../components/Board";
import Tools from "../components/Tools/Tools"
import Menu from "../components/Menu";
import Content from "../components/Content/Content";
import { useState } from "react";
import MainBoard from "../components/MainBoard/MainBoard";
import { MainBoardProvider } from "../context/MainboardContext";
import { ToolsProvider } from "../context/ToolsContext";
import { CardProvider } from "../context/CardContext";

export default function Index() {

  const [menuOpen, setMenuOpen] = useState(false);

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
        <CardProvider>
          <Tools />
          <Content />
          </CardProvider>
        </ToolsProvider>
      </MainBoardProvider>
      {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
    </div>
  );
}