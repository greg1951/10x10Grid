import "./styles.css";
import { useState } from "react";

export default function App() {
  function Game() {
    const [gameCount, setGameCount] = useState(1);
    const [boardVar, setBoardVar] = useState([]);

    let board;
    function createBoard() {
      //create battlefield board
      board = new Array(10);
      for (let i = 0; i < board.length; i += 1)
        board[i] = new Array(10).fill(0);
      console.log("board length: " + board.length);
      const rnd = (r) => Math.trunc(Math.random() * r);
      //board values
      //0 = empty
      //1  = ship
      //2 = empty missed shot
      //3 = ship hit

      //fill some random ship
      for (let l = 0; l < 40; l++) {
        board[rnd(10)][rnd(10)] = 1;
      }
    }
    //setBoardVar(board);

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => {
              createBoard();
              setBoardVar(board);
              setGameCount((c) => c + 1);
            }}
          >
            Clear
          </button>
        </div>
        <Board key={gameCount} boardVar={boardVar} />
      </div>
    );
  }

  return (
    <div className="App">
      <Game />
    </div>
  );
  function Board({ boardVar }) {
    return (
      <div className="board">
        {boardVar.map((b, iy) => (
          <div key={iy}>
            {b.map((a, ix) => (
              <Piece key={ix} x={ix} y={iy} boardVar={boardVar} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  function Piece(p) {
    const [value, setValue] = useState(p.boardVar[p.y][p.x]);
    const cls = ["piece"];
    let txt = ".";
    if (value === 2) cls.push("empty-shot");
    if (value === 3) {
      cls.push("boom");
      txt = "*";
    }
    return (
      <div
        onClick={() => {
          let c = p.boardVar[p.y][p.x];
          if (c > 1) return;
          if (c === 0) c = 2;
          else if (c === 1) c = 3;
          p.boardVar[p.y][p.x] = c;
          setValue(c);
        }}
        className={cls.join(" ")}
      >
        {txt}
      </div>
    );
  }
}
