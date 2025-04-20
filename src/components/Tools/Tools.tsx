import { Icon } from "@iconify/react/dist/iconify.js";
import { useCardContext } from "../../context/CardContext";
import { useToolsContext } from "../../context/ToolsContext";


function Tools() {	
  const { setCategorySelected, setSearch, editMode, setEditMode } = useToolsContext();
  const { categories } = useCardContext();

  return (
    <div className="flex justify-around bg-gray-100 p-1 h-[6%] w-full">
      <select className="text-center rounded-2xl bg-white border h-[100%] w-[40%] max-w-60" onChange={(e) => setCategorySelected(e.target.value)}>
        <option value="tudo">tudo</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
      <input type="text" placeholder="Buscar..." className="p-1 rounded-2xl border w-[40%] max-w-60" onChange={(e) => setSearch(e.target.value)}/>
      <button className={`rounded-xl aspect-square text-white ${editMode ? "bg-blue-500" : "bg-gray-400"}`} 
      onClick={() => setEditMode(!editMode)}><Icon icon="solar:pen-new-round-broken" width="100%" height="70%" /></button>
    </div>
  );
}

export default Tools;