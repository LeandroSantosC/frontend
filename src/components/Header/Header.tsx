import { useNavigate } from "react-router-dom";
import SettingsButton from "./SettingsButton";

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center justify-between text-white p-2 h-[7%] w-full relative"
      style={{
        backgroundImage: `url(/Img1.jpg)`, // Caminho relativo à pasta src
        backgroundSize: 'cover', // Ajusta a imagem para cobrir o header
        backgroundPosition: 'center', // Centraliza a imagem
        backgroundRepeat: 'no-repeat', // Evita repetição da imagem
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      <button 
        className="text-2xl relative z-10" 
        onClick={() => setMenuOpen(true)}
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ☰
      </button>
      <h1 
        className="text-3xl relative z-10" 
        style={{ 
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
        }}
      >
        MATRACA
      </h1>
      <div className="flex items-center gap-2 relative z-10">
        <SettingsButton />
        <button
          className="text-2xl p-2 rounded-full flex items-center justify-center"
          onClick={() => navigate("/settings")}
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
          👤
        </button>
      </div>
    </header>
  );
}

export default Header;