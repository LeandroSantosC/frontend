import { useCardContext } from "../../context/CardContext";
import { useToolsContext } from "../../context/ToolsContext";


function Tools() {	
  const { setCategorySelected, setSearch, editMode, setEditMode } = useToolsContext();
  const { categories } = useCardContext();

  return (
    <div className="flex justify-around bg-gray-100 p-1 h-[6%] w-full">
      <select className="text-center rounded-2xl bg-white border h-[100%] w-[40%] max-w-60" onChange={(e) => setCategorySelected(e.target.value)}>
        <option value="Tudo">Tudo</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <input type="text" placeholder="Buscar..." className="p-1 rounded-2xl border w-[40%] max-w-60" onChange={(e) => setSearch(e.target.value)}/>
      <button className={`rounded-xl aspect-square text-white ${editMode ? "bg-blue-500" : "bg-gray-100"}`} 
      onClick={() => setEditMode(!editMode)}>✏</button>
    </div>
  );
}

export default Tools;