import { useCardSize } from '../../context/CardSizeContext';
import { useEffect, useRef } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { cardSize, setCardSize } = useCardSize();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setCardSize(newSize);
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(2px)',
        zIndex: 9999,
      }}
    >
      <div
        ref={modalRef}
        className="p-8 rounded-lg shadow-xl w-80"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(144, 238, 144, 0.2)',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Configurações</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho dos cartões
          </label>
          <input
            type="range"
            min="30"
            max="100"
            value={cardSize}
            onChange={handleRangeChange}
            onInput={handleRangeChange}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${cardSize}%, #ddd ${cardSize}%, #ddd 100%)`,
              WebkitAppearance: 'none',
              appearance: 'none',
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">Pequeno</span>
            <span className="text-sm text-gray-500">Grande</span>
          </div>
        </div>
      </div>
    </div>
  );
} 