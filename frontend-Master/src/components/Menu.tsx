import { useNavigate } from 'react-router-dom';

interface MenuProps {
    setMenuOpen: (open: boolean) => void;
  }
  
  function Menu({ setMenuOpen }: MenuProps) {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
      setMenuOpen(false);
      navigate(path);
    };

    return (
      <div 
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(2px)'
        }}
      >
        <div 
          className="p-8 rounded-lg shadow-xl w-80"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(144, 238, 144, 0.2)'
          }}
        >
          <button 
            className="float-right text-gray-500 hover:text-gray-700 transition-colors" 
            onClick={() => setMenuOpen(false)}
          >
            ❌
          </button>
          <ul className="mt-6 space-y-4">
            <li className="cursor-pointer hover:text-blue-600 transition-colors text-lg">Botões</li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors text-lg">Pranchas</li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors text-lg">Categorias</li>
            <li 
              className="cursor-pointer hover:text-blue-600 transition-colors text-lg"
              onClick={() => handleNavigate('/settings')}
            >
              Configurações
            </li>
            <li className="cursor-pointer hover:text-blue-600 transition-colors text-lg">Sair</li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default Menu;