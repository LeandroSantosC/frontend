import "./MainBoard.css";
import BoardCard from "./BoardCard/BoardCard";
import { useMainBoardContext } from "../../context/MainboardContext";
import { BoardContextType } from "../../context/MainboardContext";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";


export default function MainBoard() {
  const { mainBoard, removeCard, removeAllCards, removeLastCard }:BoardContextType = useMainBoardContext();

  const speak = () => {
    const phrase = mainBoard.map((card) => card.name).join(" ");

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(phrase));
  }  

  return (
    <div className="MainBoard">
      <div className="flex flex-col shrink-0 w-[12%] max-w-10 justify-around h-full">
        <Button
          variant="contained"
          color="error"
          onClick={removeLastCard}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            minWidth: 0,
            padding: 0,
          }}
        >
          <Icon icon="solar:backspace-bold" width="100%" height="70%" />
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={removeAllCards}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            minWidth: 0,
            padding: 0,
          }}
        >
          <Icon icon="solar:trash-bin-trash-bold" width="100%" height="70%" />
        </Button>
      </div>
      <div className="flex h-full grow overflow-x-scroll overflow-y-visible scrollbar-hide gap-2 p-1">
        {mainBoard.map((card) => (
          <BoardCard
            key={card.tempId}
            card={card}
            removeCard={() => removeCard(card.tempId)}
          />
        ))}
      </div>
      <div className="flex flex-col shrink-0 w-[12%] max-w-10 justify-around h-full">
        <Button
          variant="contained"
          color="primary"
          onClick={speak}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            minWidth: 0,
            padding: 0,
          }}
        >
          <Icon icon="solar:clipboard-add-bold" width="100%" height="70%" />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={speak}
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            minWidth: 0,
            padding: 0,
          }}
        >
          <Icon icon="solar:play-bold" width="100%" height="60%" />
        </Button>
      </div>
    </div>
  );
}