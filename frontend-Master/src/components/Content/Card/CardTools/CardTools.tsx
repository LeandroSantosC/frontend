import "./CardTools.css";

interface CardToolsProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  editMode: boolean;
  onDelete: () => void;
}

export default function CardTools({ isVisible, setVisible, editMode, onDelete }: CardToolsProps) {
  if (editMode) {
    return (
      <div className="flex absolute top-0 mt-1 flex-row justify-evenly w-full card-options">
        {/* Primeiro botão com emoji de editar */}
        <button type="button" className="btn">
          <span className="btn-icon">✏️</span>
        </button>

        {/* Segundo botão com emoji de olho (visibilidade) */}
        <button
          type="button"
          className="btn"
          onClick={() => setVisible(!isVisible)}
          style={!isVisible ? { background: "cornflowerblue" } : {}}
        >
          <span className="btn-icon">👁️</span>
        </button>

        {/* Terceiro botão com emoji de excluir */}
        <button type="button" className="btn" onClick={onDelete}>
          <span className="btn-icon">🗑️</span>
        </button>
      </div>
    );
  }
}