import { useState } from 'react';
import { useCardSize } from '../../context/CardSizeContext';

interface SettingsButtonProps {
  setSettingsOpen: (open: boolean) => void;
}

const SettingsButton = ({ setSettingsOpen }: SettingsButtonProps) => {
  const { cardSize, setCardSize } = useCardSize();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsPopupOpen(!isPopupOpen);
    setSettingsOpen(!isPopupOpen);
  };

  return (
    <div className="relative" style={{ zIndex: 9999 }}>
      <button
        onClick={handleSettingsClick}
        className="text-2xl p-2 rounded-full"
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          color: 'white',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 9999
        }}
      >
        ⚙️
      </button>

      {isPopupOpen && (
        <div
          className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl"
          style={{
            width: '250px',
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            zIndex: 99999
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamanho dos Cards
            </label>
            <input
              type="range"
              min="40"
              max="100"
              value={cardSize}
              onChange={(e) => setCardSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${cardSize}%, #E5E7EB ${cardSize}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Pequeno</span>
              <span>Grande</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsButton; 