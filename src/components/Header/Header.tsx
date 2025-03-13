interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between bg-blue-500 text-white p-2 h-[200px] w-full"
      style={{
        backgroundImage: 'url("/imagens/im1.png")', // Caminho correto da imagem
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <button className="text-2xl" onClick={() => setMenuOpen(true)}>☰</button>
      <h1 className="text-3xl">MATRACA</h1>
      <button className="text-2xl">👤</button>
    </header>
  );
}

export default Header;
