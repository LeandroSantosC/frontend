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
      {/* Botão de menu */}
      <button className="text-2xl z-10" onClick={() => setMenuOpen(true)}>☰</button>

      {/* Título "MATRACA" posicionado sobre a imagem */}
      <h1
        className="absolute left-1/2 transform -translate-x-1/2 z-20 text-4xl text-white"
        style={{
          fontFamily: "'Baloo 2', sans-serif", // Fonte infantil
          top: '50%', // Centraliza verticalmente
          transform: 'translateY(-50%)', // Ajusta para que o texto fique exatamente no centro vertical
        }}
      >
        MATRACA
      </h1>

      {/* Botão de usuário */}
      <button className="text-2xl z-10">👤</button>
    </header>
  );
}

export default Header;
