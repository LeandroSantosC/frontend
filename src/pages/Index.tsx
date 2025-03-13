import Header from "../components/Header/Header"
// import Board from "../components/Board";
import Tools from "../components/Tools/Tools"
import Menu from "../components/Menu";
import Content from "../components/Content/Content";
import { useState } from "react";
import { CardData } from "../components/Content/Card/Card";
import MainBoard from "../components/MainBoard/MainBoard";
import { BoardCardData } from "../components/MainBoard/BoardCard/BoardCard";

export default function Index() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [mainBoard, setMainBoard] = useState<BoardCardData[]>([]);
    const [category, setCaregory] = useState<string>("Tudo");
    const [search, setSearch] = useState<string>("");

    const cards: CardData[] = [
      {
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },
      {
        id: 2,
        name: "Button 2",
        img: "https://via.placeholder.com/150",
        isVisible: true,
        category: { id: 2, name: "Categoria 2" },
      },
      {
        id: 3,
        name: "Button 3",
        img: "https://via.placeholder.com/150",
        isVisible: true,
        category: { id: 3, name: "Categoria 3" },
      },{
        id: 4,
        name: "Button 4",
        img: "https://via.placeholder.com/150",
        isVisible: true,
        category: { id: 3, name: "Categoria 3" },
      },{
        id: 5,
        name: "Button 5",
        img: "https://via.placeholder.com/150",
        isVisible: true,
        category: { id: 3, name: "Categoria 3" },
      },{
        id: 6,
        name: "Button 6",
        img: "https://via.placeholder.com/150",
        isVisible: true,
        category: { id: 3, name: "Categoria 3" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      },{
        id: 1,
        name: "Button 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsBCYo9ZQ7_X1c8gHd0jJUiwud1PAHi3jbw&s",
        isVisible: true,
        category: { id: 1, name: "Categoria 1" },
      }
    ];

    const categories = cards.map((card) => card.category).filter((category, index, self) => self.findIndex((t) => t.id === category.id) === index);

    // const boardButtons = [
    //   { id: 1, text: "BoardBtn 1" },
    //   { id: 2, text: "BoardBtn 2" },
    // ];
  
    return (
      <div className="flex flex-col h-screen w-screen overflow-hidden background-image-class">
        <Header setMenuOpen={setMenuOpen} />
        <MainBoard mainBoard={mainBoard} setMainBoard={setMainBoard} />
        <Tools setSearch={setSearch} setCategory={setCaregory} categories={categories} editMode={editMode} setEditMode={setEditMode} />
        <Content search={search} category={category} cards={cards} editMode={editMode} setMainBoard={setMainBoard} />
        {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      </div>
    );
  }