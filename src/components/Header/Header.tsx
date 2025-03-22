interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header
      className="relative flex items-center justify-center bg-blue-500 text-white p-2 h-[200px] w-full"
      style={{
        backgroundImage: 'url("/imagens/im1.png")', // Caminho correto da imagem
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      {/* Botão de menu */}
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl z-10" onClick={() => setMenuOpen(true)}>
        ☰
      </button>

      {/* Título "MATRACA" posicionado sobre a imagem */}
      <h1
        className="absolute text-4xl text-white z-20"
        style={{
          fontFamily: "'Baloo 2', sans-serif", // Fonte infantil
        }}
      ><h1 className="text-3xl absolute left-1/2 transform -translate-x-1/2 text-white">MATRACA</h1>
        MATRACA
      </h1>

      {/* Botão de usuário */}
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl z-10">👤</button>
    </header>
  );
}

export default Header;
