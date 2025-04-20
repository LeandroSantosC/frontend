import "./CardTools.css";
import { useCardContext } from "../../../../context/CardContext";
import { Icon } from '@iconify/react';


interface CardToolsProps {
    id: string;
    isVisible: boolean;
    setVisible: (value: boolean) => void;
    editMode: boolean;
    setEditing: () => void;
}

export default function CardTools({id, isVisible, setVisible, editMode, setEditing}: CardToolsProps) {
    const { deleteCard } = useCardContext();

    if (editMode) {

        return <div className="flex absolute top-0 mt-1 flex-row justify-evenly w-full card-options">
            <button type="button" className="btn bg-red-500" onClick={() => deleteCard(id)}><Icon icon="solar:trash-bin-trash-broken" width="100%" height="70%" /></button>
            <button type="button" className="btn bg-gray-300" onClick={() => setVisible(!isVisible)} style={ !isVisible ? { background: "cornflowerblue" }: {}}><Icon icon="solar:eye-broken" width="100%" height="70%" /></button>
            <button type="button" className="btn bg-gray-300" onClick={() => setEditing()}><Icon icon="solar:pen-new-round-broken" width="100%" height="70%" /></button>
        </div>

    }
}