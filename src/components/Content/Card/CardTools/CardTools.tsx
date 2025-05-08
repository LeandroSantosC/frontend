import "./CardTools.css";
import { useCardContext } from "../../../../context/CardContext";
import { Icon } from '@iconify/react';
import { useToolsContext } from "../../../../context/ToolsContext";
import { ButtonBase } from "@mui/material";
import { CardData } from "../Card";
import DeleteCardDialog from "../../Dialog/DeleteCardDialog";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";



interface CardToolsProps {
    card: CardData;
    isVisible: boolean;
    setEditing: () => void;
}

export default function CardTools({card, isVisible, setEditing}: CardToolsProps) {
    const { setVisible } = useCardContext();
    const { editMode } = useToolsContext();
    const [open, setOpen] = useState<boolean>(false);

    return <AnimatePresence>
        {editMode ? (
         <motion.div
        key={card.id}
        initial={{ top: -50 }}
        animate={{ top: 0 }}
        exit={{ top: -50 }}
        transition={{ duration: 0.3 }}
        className="flex absolute top-0 mt-1 flex-row justify-evenly w-full">
            <ButtonBase className="btn" sx={{borderRadius: "50%", backgroundColor: "#fb2c36",}} onClick={() => setOpen(true)}><Icon icon="solar:trash-bin-trash-broken" width="100%" height="70%" /></ButtonBase>
            <ButtonBase className="btn bg-gray-300" sx={{borderRadius: "50%", backgroundColor: "#d1d5dc"}} onClick={() => setVisible(card.id)} style={ !isVisible ? { background: "cornflowerblue" }: {}}><Icon icon={ isVisible ? "solar:eye-broken": "solar:eye-closed-broken"} width="100%" height="70%" /></ButtonBase>
            <ButtonBase className="btn" sx={{borderRadius: "50%", backgroundColor: "#d1d5dc"}} onClick={() => setEditing()}><Icon icon="solar:pen-new-round-broken" width="100%" height="70%" /></ButtonBase>
            <DeleteCardDialog card={card} open={open} setOpen={setOpen} />
        </motion.div>
        ) : ("")}
        </AnimatePresence>
}