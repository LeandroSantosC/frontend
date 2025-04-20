import React, { useState } from "react";
import { useToolsContext } from "../../context/ToolsContext";

interface ToolsProps {
  categories: Array<{ id: number; name: string }>;
}

const Tools: React.FC<ToolsProps> = ({ categories }) => {
  const { setCategory, setSearch, editMode, setEditMode } = useToolsContext();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearch(value);
    console.log("Valor da busca atualizado:", value);
  };

  return (
    <div
      className="flex flex-row p-2 gap-2 items-center justify-between"
      style={{
        flexShrink: 0,
        maxHeight: "clamp(60px, 10vh, 80px)",
        boxSizing: "border-box",
        width: "100%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        overflow: "hidden"
      }}
    >
      <div className="flex md:flex-row gap-4 w-full md:w-auto">
        <div className="w-full md:w-48">
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            style={{ maxWidth: "100%" }}
          >
            <option value="">Tudo</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-64">
          <input
            id="search"
            type="text"
            placeholder="Digite para buscar..."
            value={searchValue}
            onChange={handleSearchChange}
            className="mt-1 w-full p-2 border rounded"
            style={{ maxWidth: "100%" }}
          />
        </div>
      </div>

      <button
        className="w-10 h-10 rounded-full flex items-center justify-center"
        onClick={() => setEditMode(!editMode)}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          fontSize: "1.25rem"
        }}
      >
        ✏️
      </button>
    </div>
  );
};

export default Tools;