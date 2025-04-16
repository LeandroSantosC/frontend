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
      <button className="text-2xl" onClick={() => setMenuOpen(true)}>
        ☰
      </button>
      <h1 className="text-3xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>MATRACA</h1>
      <button className="text-2xl">👤</button>
    </header>
  );
}

export default Header;