import "./CardTools.css";
import { useCardContext } from "../../../../context/CardContext";

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
            <button type="button" className="btn" onClick={() => deleteCard(id)}></button>
            <button type="button" className="btn" onClick={() => setVisible(!isVisible)} style={ !isVisible ? { background: "cornflowerblue" }: {}}></button>
            <button type="button" className="btn" onClick={() => setEditing()}></button>
        </div>

    }
}