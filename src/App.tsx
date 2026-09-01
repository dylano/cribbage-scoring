import { useState, useEffect } from "react";
import styles from "./App.module.css";
import WinningPeg from "./WinningPeg/WinningPeg.tsx";
import Player from "./Player/Player.tsx";
import { WINNING_SCORE } from "./constants.ts";

export function App() {
  const [winner, setWinner] = useState(0);
  const [p1Score, setP1Score] = useState(100);
  const [p2Score, setP2Score] = useState(105);

  // check for winner
  useEffect(() => {
    if (winner) return;
    if (p1Score >= WINNING_SCORE) setWinner(1);
    else if (p2Score >= WINNING_SCORE) setWinner(2);
  }, [p1Score, p2Score, winner]);

  function incrementScore(playerId: number, increment: number) {
    if (playerId === 1) {
      setP1Score((prev) => prev + increment);
    }

    if (playerId === 2) {
      setP2Score((prev) => prev + increment);
    }
  }

  function resetGame() {
    setWinner(0);
    setP1Score(0);
    setP2Score(0);
  }

  return (
    <div className={styles.app}>
      <Player
        playerId={1}
        score={p1Score}
        opponentScore={p2Score}
        incrementScore={(pts: number) => incrementScore(1, pts)}
        winner={winner}
        resetGame={resetGame}
        flipped
      />
      <WinningPeg winner={winner} />
      <Player
        playerId={2}
        score={p2Score}
        opponentScore={p1Score}
        incrementScore={(pts: number) => incrementScore(2, pts)}
        winner={winner}
        resetGame={resetGame}
      />
    </div>
  );
}
