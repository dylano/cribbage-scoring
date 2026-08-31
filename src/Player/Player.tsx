import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import styles from "./Player.module.css";

interface PlayerProps {
  playerId: number;
  score: number;
  opponentScore: number;
  incrementScore: (pts: number) => void;
  winner: number;
  flipped?: boolean;
  resetGame: () => void;
}

export default function Player({
  playerId,
  score,
  opponentScore,
  incrementScore,
  winner,
  flipped,
  resetGame,
}: PlayerProps) {
  const hasWon = winner === playerId;
  const [doCelebration, setDoCelebration] = useState(false);
  const gameOver = winner !== 0;

  // Celebrate the win
  useEffect(() => {
    if (!hasWon) {
      setDoCelebration(false);
      return;
    }
    setDoCelebration(true);
    const timer = setTimeout(() => setDoCelebration(false), 1500);
    return () => clearTimeout(timer);
  }, [hasWon]);

  const classNames = [styles.player, flipped && styles.flipped].filter(Boolean).join(" ");

  return (
    <div
      className={classNames}
      style={{ "--player-color": `var(--color-player${playerId})` } as React.CSSProperties}
    >
      <div>
        <p>Me: {score}</p>
        <p>Them: {opponentScore}</p>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={() => incrementScore(1)} disabled={gameOver}>
          +1
        </button>
        <button onClick={() => incrementScore(2)} disabled={gameOver}>
          +2
        </button>
        <button onClick={() => incrementScore(5)} disabled={gameOver}>
          +5
        </button>
      </div>
      <div
        style={{
          minHeight: 200,
        }}
      >
        {hasWon && <ReactConfetti gravity={0.2} numberOfPieces={150} run recycle={doCelebration} />}
        {hasWon && !doCelebration && <button onClick={() => resetGame()}>Reset</button>}
      </div>
    </div>
  );
}
