import { useCardSize } from '../context/CardSizeContext';
import { useState } from 'react';

interface MenuProps {
  setMenuOpen: (open: boolean) => void;
}

function Menu({ setMenuOpen }: MenuProps) {
  const { cardSize, setCardSize } = useCardSize();
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [voicePitch, setVoicePitch] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [activeSection, setActiveSection] = useState<'main' | 'voice' | 'cards'>('main');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const testVoice = () => {
    const utterance = new SpeechSynthesisUtterance("Teste de voz");
    utterance.rate = voiceSpeed;
    utterance.pitch = voicePitch;
    if (selectedVoice) {
      const voice = speechSynthesis.getVoices().find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const applyVoiceSettings = () => {
    // Save voice settings to localStorage
    localStorage.setItem('voiceSettings', JSON.stringify({
      selectedVoice,
      voiceSpeed,
      voicePitch
    }));
    
    // Show confirmation message
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const renderMainMenu = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">CONFIGURAÇÕES</h2>
        <button
          onClick={() => setMenuOpen(false)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm flex items-center justify-center"
          style={{ width: '30px', height: '30px' }}
        >
          ✕
        </button>
      </div>
      <button
        onClick={() => setActiveSection('voice')}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-3"
      >
        <span>🔊</span>
        <span>Ajuste de Voz</span>
      </button>
      <button
        onClick={() => setActiveSection('cards')}
        className="w-full px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-3"
      >
        <span>📏</span>
        <span>Ajuste de Cards</span>
      </button>
    </div>
  );

  const renderVoiceSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ajuste de Voz</h2>
        <button
          onClick={() => setActiveSection('main')}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Voltar
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voz selecionada
          </label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full p-2 border rounded bg-white"
          >
            <option value="">Escolha uma voz</option>
            {speechSynthesis.getVoices().map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Velocidade da pronúncia
          </label>
          <div className="flex items-center gap-2">
            <span>-</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceSpeed}
              onChange={(e) => setVoiceSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span>+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tom da voz
          </label>
          <div className="flex items-center gap-2">
            <span>-</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voicePitch}
              onChange={(e) => setVoicePitch(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span>+</span>
          </div>
        </div>

        <button
          onClick={testVoice}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>▶</span> Testar voz
        </button>
        
        <button
          onClick={applyVoiceSettings}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>✓</span> Aplicar configurações
        </button>
        
        {showConfirmation && (
          <div className="mt-2 p-2 bg-green-100 text-green-800 rounded text-center">
            Configurações aplicadas com sucesso!
          </div>
        )}
      </div>
    </div>
  );

  const renderCardSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ajuste de Cards</h2>
        <button
          onClick={() => setActiveSection('main')}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Voltar
        </button>
      </div>
      
      <div>
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
  );

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(2px)'
      }}
    >
      <div 
        className="p-8 rounded-lg shadow-xl w-96"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(144, 238, 144, 0.2)'
        }}
      >
        <div className="relative">
          {activeSection === 'main' && renderMainMenu()}
          {activeSection === 'voice' && renderVoiceSettings()}
          {activeSection === 'cards' && renderCardSettings()}
        </div>

        {activeSection !== 'main' && (
          <div className="flex justify-end mt-6">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu; 