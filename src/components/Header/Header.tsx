interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header
  className="relative flex items-center justify-between bg-blue-500 text-white p-2 h-[200px] w-full"
  style={{
    backgroundImage: 'url("/imagens/im1.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  }}
>
  <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay semitransparente */}
  <button className="text-2xl" onClick={() => setMenuOpen(true)}>☰</button>
  <h1 className="text-3xl absolute left-1/2 transform -translate-x-1/2 text-white">MATRACA</h1>
  <button className="text-2xl">👤</button>
</header>

  );
}

export default Header;
