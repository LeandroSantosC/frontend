import "./CardTools.css";

interface CardToolsProps {
    isVisible: boolean;
    setVisible: (value: boolean) => void;
    editMode: boolean;
}

export default function CardTools({isVisible, setVisible, editMode}: CardToolsProps) {

    if (editMode) {

        return <div className="flex absolute top-0 mt-1 flex-row justify-evenly w-full card-options">
            <button type="button" className="btn"></button>
            <button type="button" className="btn" onClick={() => setVisible(!isVisible)} style={ !isVisible ? { background: "cornflowerblue" }: {}}></button>
            <button type="button" className="btn"></button>
        </div>

    }
}