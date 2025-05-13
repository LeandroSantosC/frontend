import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "../Card.css"
import Board, { BoardData } from "../Board/Board";


export default function DeleteCardDialog({board, open, setOpen}: {board: BoardData, open: boolean, setOpen:(open: boolean) => void}) {
    const { deleteCard } = useBoardContext();

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
            <Board board={board} />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} autoFocus>Não</Button>
            <Button onClick={() => {
                deleteBoard(board.id)
                setOpen(false)
            }}>
                Sim
            </Button>
        </DialogActions>
    </Dialog>)
}