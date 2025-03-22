interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header
      className="relative flex items-center justify-between bg-blue-500 text-white p-2 h-[200px] w-full"
      style={{
        backgroundImage: 'url("/imagens/im1.png")', // Caminho correto da imagem
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      {/* Botão Menu */}
      <button className="text-2xl" onClick={() => setMenuOpen(true)}>☰</button>

      {/* Título "MATRACA" posicionado sobre a imagem com a nova fonte */}
      <h1 className="text-3xl absolute left-1/2 transform -translate-x-1/2 text-white" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
        MATRACA
      </h1>

      {/* Botão de usuário */}
      <button className="text-2xl">👤</button>
    </header>
  );
}

export default Header;
