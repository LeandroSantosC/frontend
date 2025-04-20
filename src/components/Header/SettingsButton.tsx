import { useState } from 'react';
import { useCardSize } from '../../context/CardSizeContext';

export default function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { cardSize, setCardSize } = useCardSize();

  return (
    <div className="relative z-50">
      <button
        className="text-2xl p-2 rounded-full flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          color: 'white',
          width: '40px',
          height: '40px',
        }}
      >
        ⚙️
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 p-4 rounded-lg shadow-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(144, 238, 144, 0.2)',
            minWidth: '200px',
            zIndex: 1000,
          }}
        >
          <div className="mb-2 text-gray-700 font-medium">Tamanho dos cartões</div>
          <input
            type="range"
            min="30"
            max="100"
            value={cardSize}
            onChange={(e) => setCardSize(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 ' + cardSize + '%, #ddd ' + cardSize + '%, #ddd 100%)',
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">Pequeno</span>
            <span className="text-sm text-gray-500">Grande</span>
          </div>
        </div>
      )}
    </div>
  );
} 