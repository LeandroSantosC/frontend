import React from 'react';
import { useToolsContext } from '../../context/ToolsContext';

interface ToolsProps {
  categories: Array<{ id: number; name: string }>;
}

const Tools: React.FC<ToolsProps> = ({ categories }) => {
  const { setCategory, setSearch, editMode, setEditMode } = useToolsContext();

  return (
      <div className="flex flex-row p-2 gap-2 items-center justify-between">
        <div className="flex md:flex-row gap-4 w-full md:w-auto">
          <div className="w-full md:w-48">
            <select
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1"
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
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <button 
          className="rounded-full w-10 h-8 flex items-center justify-center"
          onClick={() => setEditMode(!editMode)}
          style={{
            backgroundColor: 'rgba(144, 238, 144, 0.3)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(144, 238, 144, 0.2)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <span className="text-base">✏️</span>
        </button>
      </div>
  );
};

export default Tools;