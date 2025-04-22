interface HeaderProps {
  setMenuOpen: (open: boolean) => void;
}

function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-blue-500 text-white p-2 h-[5%] w-full">
      <button className="text-2xl" onClick={() => setMenuOpen(true)}>☰</button>
      <h1 className="text-3xl">MATRACA</h1>
      <button className="text-2xl">👤</button>
    </header>
  );
}

export default Header;