import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-center text-white p-2 h-[9%] w-full relative">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/im1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2
        }}
      ></div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 flex items-center justify-center w-full">
        <h1 
          className="text-5xl font-bold uppercase tracking-wider" 
          style={{ 
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
            letterSpacing: '0.1em',
            transform: 'perspective(500px) rotateX(10deg)',
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text'
          }}
        >
          <span style={{ 
            background: 'linear-gradient(45deg, #FF9A9E, #FAD0C4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>M</span>
          <span style={{ 
            background: 'linear-gradient(45deg, #A1C4FD, #C2E9FB)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>A</span>
          <span style={{ 
            background: 'linear-gradient(45deg, #FFECD2, #FCB69F)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>T</span>
          <span style={{ 
            background: 'linear-gradient(45deg, #84FAB0, #8FD3F4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>R</span>
          <span style={{ 
            background: 'linear-gradient(45deg, #FF9A9E, #FAD0C4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>A</span>
          <span style={{ 
            background: 'linear-gradient(45deg, #A1C4FD, #C2E9FB)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>C</span>
          <span style={{ 
            background: 'linear-gradient(45deg, #FFECD2, #FCB69F)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>A</span>
        </h1>
      </div>
      <button 
        className="text-2xl p-2 rounded-full absolute right-4 relative z-10" 
        onClick={() => navigate('/settings')}
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