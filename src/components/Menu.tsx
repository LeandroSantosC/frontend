interface MenuProps {
    setMenuOpen: (open: boolean) => void;
  }
  
  function Menu({ setMenuOpen }: MenuProps) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <button className="float-right" onClick={() => setMenuOpen(false)}>❌</button>
          <ul className="mt-4 space-y-2">
            <li>Botões</li>
            <li>Pranchas</li>
            <li>Categorias</li>
            <li>Configurações</li>
            <li>Sair</li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default Menu;