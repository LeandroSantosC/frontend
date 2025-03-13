interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header
      className="relative flex items-center justify-center text-white p-2 h-[200px] w-full"
      style={{
        backgroundImage: 'url("/imagens/im1.png")', // Caminho correto da imagem
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" /> {/* Opacidade ajustada para overlay */}

      {/* Botão de menu */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl z-20" onClick={() => setMenuOpen(true)}>
        ☰
      </button>

      {/* Título "MATRACA" posicionado sobre a imagem */}
      <h1
        className="text-4xl absolute left-1/2 transform -translate-x-1/2 z-20"
        style={{
          fontFamily: "'Baloo 2', sans-serif", // Fonte infantil
        }}
      >
        MATRACA
      </h1>

      {/* Botão de usuário */}
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl z-20">👤</button>
    </header>
  );
}

export default Header;
