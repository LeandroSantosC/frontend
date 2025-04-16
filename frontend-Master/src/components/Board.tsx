interface BoardProps {
    boardButtons: { id: number; text: string }[];
  }
  
  function Board({ boardButtons }: BoardProps) {
    return (
      <div className="flex items-center justify-around bg-blue-500 p-4 h-32">
        <button className="text-white text-2xl">↩</button>
        <div className="flex gap-4 overflow-x-auto">
          {boardButtons.map((btn) => (
            <div key={btn.id} className="p-4 bg-gray-300 rounded-md shadow-md">{btn.text}</div>
          ))}
        </div>
        <button className="text-white text-2xl">▶</button>
      </div>
    );
  }
  
  export default Board;