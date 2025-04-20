import { useNavigate } from "react-router-dom";

interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}

function Header({ setMenuOpen, setSettingsOpen }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className="flex items-center justify-center text-white p-2 w-full relative"
      style={{
        minHeight: "clamp(50px, 9vh, 60px)",
        height: "auto",
        flexShrink: 0,
        boxSizing: "border-box",
        padding: "0.5rem 1rem"
      }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/im1.png)`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            opacity: 0.2,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content layer */}
      <div className="relative z-20 flex items-center justify-between w-full max-w-[1440px] mx-auto">
        <button 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          onClick={() => setMenuOpen(true)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            fontSize: "1.5rem"
          }}
        >
          ☰
        </button>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider"
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

        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          onClick={() => navigate("/settings")}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            fontSize: "1.25rem"
          }}
        >
          👤
        </button>
      </div>
    </header>
  );
}

export default Header;