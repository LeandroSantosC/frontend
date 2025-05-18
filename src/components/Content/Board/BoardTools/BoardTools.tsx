import "./BoardTools.css";
import { Icon } from '@iconify/react';
import { useToolsContext } from "../../../../context/ToolsContext";
import { ButtonBase } from "@mui/material";
import { BoardData } from "../Board";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DeleteBoardDialog from "../../Dialog/DeleteBoardDialog";
import { useBoardContext } from "../../../../context/BoardContext";



interface BoardToolsProps {
    board: BoardData;
    isVisible: boolean;
    setEditing: () => void;
}

export default function BoardTools({board, isVisible, setEditing}: BoardToolsProps) {
    const { setVisible } = useBoardContext();
    const { editMode } = useToolsContext();
    const [open, setOpen] = useState<boolean>(false);

    return <AnimatePresence>
        {editMode ? (
         <motion.div
        key={board.id}
        initial={{ top: -50 }}
        animate={{ top: 0 }}
        exit={{ top: -50 }}
        transition={{ duration: 0.3 }}
        className="flex absolute left-0 ml-1 flex-col justify-evenly h-full aspect-square">
            <ButtonBase className="btn" sx={{borderRadius: "50%", backgroundColor: "#fb2c36",}} onClick={() => setOpen(true)}><Icon icon="solar:trash-bin-trash-broken" width="100%" height="70%" /></ButtonBase>
            <ButtonBase className="btn bg-gray-300" sx={{borderRadius: "50%", backgroundColor: "#d1d5dc"}} onClick={() => setVisible(board.id)} style={ !isVisible ? { background: "cornflowerblue" }: {}}><Icon icon={ isVisible ? "solar:eye-broken": "solar:eye-closed-broken"} width="100%" height="70%" /></ButtonBase>
            <ButtonBase className="btn" sx={{borderRadius: "50%", backgroundColor: "#d1d5dc"}} onClick={() => setEditing()}><Icon icon="solar:pen-new-round-broken" width="100%" height="70%" /></ButtonBase>
            <DeleteBoardDialog board={board} open={open} setOpen={setOpen} />
        </motion.div>
        ) : ("")}
        </AnimatePresence>
}