import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCardContext } from "../../../context/CardContext";
import { CardData } from "../Card/Card";
import "../Card.css"


export default function DeleteCardDialog({card, open, setOpen}: {card: CardData, open: boolean, setOpen:(open: boolean) => void}) {
    const { deleteCard } = useCardContext();

    return (<Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {"Deseja excluir o card permanentemente ?"}
        </DialogTitle>
        <DialogContent>
            <div className="items-center flex justify-center pt-3">
            <div className="card flex flex-col items-center h-full w-full m-0 p-0">
                <img src={card.image} alt={card.name} className="flex relative h-full w-full rounded-inherit pointer-events-none" />
                <div className="flex justify-center items-center h-[15%] w-fit">
                    <span className="pointer-events-none overflow-hidden text-center text-nowrap whitespace-nowrap font-bold text-[110%]">{card.name}</span>
                </div>
            </div>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} autoFocus>Não</Button>
            <Button onClick={() => {
                deleteCard(card.id)
                setOpen(false)
            }}>
                Sim
            </Button>
        </DialogActions>
    </Dialog>)
}