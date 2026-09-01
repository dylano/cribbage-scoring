import { useState, useEffect } from "react";
import styles from "./App.module.css";
import WinningPeg from "./WinningPeg/WinningPeg.tsx";
import Player from "./Player/Player.tsx";
import { WINNING_SCORE } from "./constants.ts";

interface PlayerScore {
  score: number;
  previousScore: number;
}

export function App() {
  const [winner, setWinner] = useState(0);
  const [player1, setPlayer1] = useState<PlayerScore>({ score: 90, previousScore: 66 });
  const [player2, setPlayer2] = useState<PlayerScore>({ score: 90, previousScore: 80 });

  // check for winner
  useEffect(() => {
    if (winner) return;
    if (player1.score >= WINNING_SCORE) setWinner(1);
    else if (player2.score >= WINNING_SCORE) setWinner(2);
  }, [player1, player2, winner]);

  function incrementScore(playerId: number, increment: number) {
    if (playerId === 1) {
      setPlayer1((p) => ({
        previousScore: p.score,
        score: Math.min(WINNING_SCORE, p.score + increment),
      }));
    }

    if (playerId === 2) {
      setPlayer2((p) => ({
        previousScore: p.score,
        score: Math.min(WINNING_SCORE, p.score + increment),
      }));
    }
  }

  function resetGame() {
    setWinner(0);
    setPlayer1({ score: 0, previousScore: 0 });
    setPlayer2({ score: 0, previousScore: 0 });
  }

  return (
    <div className={styles.app}>
      <Player
        playerId={1}
        score={player1.score}
        previousScore={player1.previousScore}
        opponentScore={player2.score}
        incrementScore={(pts: number) => incrementScore(1, pts)}
        winner={winner}
        resetGame={resetGame}
        flipped
      />
      <WinningPeg winner={winner} />
      <Player
        playerId={2}
        score={player2.score}
        previousScore={player2.previousScore}
        opponentScore={player1.score}
        incrementScore={(pts: number) => incrementScore(2, pts)}
        winner={winner}
        resetGame={resetGame}
      />
    </div>
  );
}
