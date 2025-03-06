interface ToolsProps {
  categories: {
    id: number;
    name: string;
  }[];
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
}

function Tools({ categories, editMode, setEditMode, setCategory, setSearch }: ToolsProps) {
  return (
    <div className="flex justify-around bg-gray-100 p-1 h-[6%] max-w-full">
      <select className="p-2 rounded-2xl bg-white border w-[40%] max-w-60" onChange={(e) => setCategory(e.target.value)}>
        <option value="Tudo">Tudo</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <input type="text" placeholder="Buscar..." className="p-1 rounded-2xl border w-[40%] max-w-60" onChange={(e) => setSearch(e.target.value)}/>
      <button className={`p-2 rounded-2xl aspect-square text-white ${editMode ? "bg-blue-500" : "bg-gray-100"}`} 
      onClick={() => setEditMode(!editMode)}>✏</button>
    </div>
  );
}

export default Tools;