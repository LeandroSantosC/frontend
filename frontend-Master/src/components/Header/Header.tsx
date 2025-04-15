interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between text-white p-2 h-[7%] w-full"
      style={{
        backgroundImage: `url(/Img1.jpg)`, // Caminho relativo à pasta src
        backgroundSize: 'cover', // Ajusta a imagem para cobrir o header
        backgroundPosition: 'center', // Centraliza a imagem
        backgroundRepeat: 'no-repeat', // Evita repetição da imagem
      }}
    >
      <button 
        className="text-2xl p-2 rounded-full" 
        onClick={() => setMenuOpen(true)}
        style={{
          backgroundColor: 'rgba(144, 238, 144, 0.3)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(144, 238, 144, 0.2)'
        }}
      >
        ☰
      </button>
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
        className="text-2xl p-2 rounded-full" 
        style={{
          backgroundColor: 'rgba(144, 238, 144, 0.3)',
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(144, 238, 144, 0.2)'
        }}
      >
        👤
      </button>
    </header>
  );
}

export default Header;