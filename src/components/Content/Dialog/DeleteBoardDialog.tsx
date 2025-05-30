import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "../Board/Board.css"
import { BoardData } from "../Board/Board";
import { useBoardContext } from "../../../context/BoardContext";


export default function DeleteCardDialog({board, open, setOpen}: {board: BoardData, open: boolean, setOpen:(open: boolean) => void}) {
    const { deleteBoard } = useBoardContext();
    const { id, name, button: cards} = board;

    return (<Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {"Deseja excluir a prancha permanentemente ?"}
        </DialogTitle>
        <DialogContent>
            <div
          className="flex flex-col items-center h-full w-full m-0 p-1 shadow-[0px_0.15rem_0.4rem_0px] rounded-[3vh]"
            >
          <div className="flex flex-row items-center justify-evenly w-full h-[85%] m-0 p-0.5 overflow-ellipsis gap-1 p-1">
            {cards.map((card) => (
              <div
              key={card.id}
              className=" aspect-[1/1.25] h-full w-auto bg-white rounded-lg"
              style={{height:'100%', width:'auto', padding:2}}
              >
                <img src={card.image} alt={card.name} className="flex  relative h-[80%] w-full aspect-square pointer-events-none grow-0 shrink-0" />
                <div className="flex justify-center items-center grow-0 shrink-0 h-[20%]">
                  <span className="pointer-events-none">{card.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center h-[15%] w-fit">
            <span className="pointer-events-none overflow-hidden text-center text-nowrap whitespace-nowrap font-bold text-[100%]">{name}</span>
          </div>
        </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} autoFocus>Não</Button>
            <Button onClick={() => {
                deleteBoard(id)
                setOpen(false)
            }}>
                Sim
            </Button>
        </DialogActions>
    </Dialog>)
}