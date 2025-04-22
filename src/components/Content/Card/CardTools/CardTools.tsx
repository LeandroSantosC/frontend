import "./CardTools.css";
import { useCardContext } from "../../../../context/CardContext";
import { Icon } from '@iconify/react';
import { useToolsContext } from "../../../../context/ToolsContext";


interface CardToolsProps {
    id: string;
    isVisible: boolean;
    setEditing: () => void;
}

export default function CardTools({id, isVisible, setEditing}: CardToolsProps) {
    const { deleteCard, setVisible } = useCardContext();
    const { editMode } = useToolsContext();

    if (editMode) {

        return <div className="flex absolute top-0 mt-1 flex-row justify-evenly w-full card-options">
            <button type="button" className="btn bg-red-500" onClick={() => deleteCard(id)}><Icon icon="solar:trash-bin-trash-broken" width="100%" height="70%" /></button>
            <button type="button" className="btn bg-gray-300" onClick={() => setVisible(id)} style={ !isVisible ? { background: "cornflowerblue" }: {}}><Icon icon={ isVisible ? "solar:eye-broken": "solar:eye-closed-broken"} width="100%" height="70%" /></button>
            <button type="button" className="btn bg-gray-300" onClick={() => setEditing()}><Icon icon="solar:pen-new-round-broken" width="100%" height="70%" /></button>
        </div>

    }
}