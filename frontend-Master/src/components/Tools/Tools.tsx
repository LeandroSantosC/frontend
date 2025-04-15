import { useToolsContext } from "../../context/ToolsContext";

interface ToolsProps {
  categories: {
    id: number;
    name: string;
  }[];
}

function Tools({ categories }:ToolsProps) {	
  const { setCategory, setSearch, editMode, setEditMode } = useToolsContext();

  return (
    <div 
      className="flex justify-between items-center p-2 h-[6%] max-w-full gap-4"
      style={{
        backgroundColor: 'rgba(144, 238, 144, 0.3)',
        backdropFilter: 'blur(2px)',
        border: '1px solid rgba(144, 238, 144, 0.2)',
        borderRadius: '8px'
      }}
    >
      <div className="flex items-center gap-4 flex-1">
        <select 
          className="p-2 rounded-lg bg-white border w-48 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setCategory(e.target.value)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(2px)'
          }}
        >
          <option value="Tudo">Tudo</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="p-2 rounded-lg border w-48 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(2px)'
          }}
        />
      </div>
      <button 
        className={`p-2 rounded-lg aspect-square text-white ${editMode ? "bg-blue-500" : "bg-gray-300"} hover:bg-blue-600 transition-colors`} 
        onClick={() => setEditMode(!editMode)}
        title={editMode ? "Desativar edição" : "Ativar edição"}
        style={{
          backgroundColor: editMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(156, 163, 175, 0.8)',
          backdropFilter: 'blur(2px)'
        }}
      >
        ✏️
      </button>
    </div>
  );
}

export default Tools;