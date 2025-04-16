import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center justify-center text-white p-2 h-[7%] w-full relative"
      style={{
        backgroundImage: `url(/Img1.jpg)`, // Caminho relativo à pasta src
        backgroundSize: 'cover', // Ajusta a imagem para cobrir o header
        backgroundPosition: 'center', // Centraliza a imagem
        backgroundRepeat: 'no-repeat', // Evita repetição da imagem
      }}
    >
      <h1 
        className="text-4xl font-bold tracking-wide" 
        style={{ 
          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          letterSpacing: '0.1em',
          fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
          color: '#ffffff',
          transform: 'perspective(500px) rotateX(10deg)',
          textTransform: 'uppercase'
        }}
      >
        MATRACA
      </h1>
      <button 
        className="text-2xl p-2 rounded-full absolute right-4" 
        onClick={() => navigate('/profile')}
        style={{
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          color: 'white'
        }}
      >
        👤
      </button>
    </header>
  );
}

export default Header;