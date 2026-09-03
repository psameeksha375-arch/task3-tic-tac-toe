import { useState } from "react";
import "./App.css";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [gameMode, setGameMode] = useState("player");

  const checkWinner = (newBoard) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }

    if (newBoard.every((cell) => cell !== "")) {
      return "Draw";
    }

    return "";
  };

  const computerMove = (newBoard) => {
    const emptyCells = newBoard
      .map((cell, index) => (cell === "" ? index : null))
      .filter((index) => index !== null);

    if (emptyCells.length === 0) return;

    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    newBoard[randomCell] = "O";

    const result = checkWinner(newBoard);

    setBoard([...newBoard]);

    if (result) {
      setWinner(result);
    } else {
      setCurrentPlayer("X");
    }
  };

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    // Prevent clicking during computer turn
    if (gameMode === "computer" && currentPlayer === "O") return;

    const newBoard = [...board];

    newBoard[index] = currentPlayer;

    const result = checkWinner(newBoard);

    setBoard(newBoard);

    if (result) {
      setWinner(result);
      return;
    }

    if (gameMode === "computer") {
      setCurrentPlayer("O");

      setTimeout(() => {
        computerMove([...newBoard]);
      }, 500);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
  };

  const changeMode = (mode) => {
    setGameMode(mode);
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
  };

  return (
    <div className="app">

      <div className="game">

        <h1>Tic-Tac-Toe</h1>

        <p className="description">
          Classic Tic-Tac-Toe Game
        </p>

        <div className="mode-container">

          <button
            className={gameMode === "player" ? "mode active" : "mode"}
            onClick={() => changeMode("player")}
          >
            Player vs Player
          </button>

          <button
            className={gameMode === "computer" ? "mode active" : "mode"}
            onClick={() => changeMode("computer")}
          >
            Player vs Computer
          </button>

        </div>

        <div className="status">

          {winner === "Draw" && "It's a Draw!"}

          {winner && winner !== "Draw" && (
            <>
              Player <span>{winner}</span> Wins!
            </>
          )}

          {!winner && gameMode === "player" && (
            <>
              Player <span>{currentPlayer}</span>'s Turn
            </>
          )}

          {!winner &&
            gameMode === "computer" &&
            currentPlayer === "X" && (
              <>
                Your Turn <span>X</span>
              </>
            )}

          {!winner &&
            gameMode === "computer" &&
            currentPlayer === "O" && (
              <>
                Computer's Turn <span>O</span>
              </>
            )}

        </div>

        <div className="board">

          {board.map((cell, index) => (
            <button
              key={index}
              className={`cell ${cell.toLowerCase()}`}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </button>
          ))}

        </div>

        <button className="new-game" onClick={resetGame}>
          New Game
        </button>

      </div>

    </div>
  );
}

export default App;