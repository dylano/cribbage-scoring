import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import styles from "./Player.module.css";
import ProgressBorder from "../ProgressBorder/ProgressBorder";
import { WINNING_SCORE, WINNING_PEG_DIAMETER, WINNING_PEG_CLEARANCE } from "../constants";

interface PlayerProps {
  playerId: number;
  score: number;
  previousScore: number;
  opponentScore: number;
  incrementScore: (pts: number) => void;
  winner: number;
  flipped?: boolean;
  resetGame: () => void;
}

export default function Player({
  playerId,
  score,
  previousScore,
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
    <div className={classNames}>
      <ProgressBorder
        filled={score}
        previousFilled={previousScore}
        count={WINNING_SCORE - 1}
        radius={24}
        completeColor={`var(--color-player${playerId})`}
        inset={7}
        density={0.27}
        majorEvery={10}
        gap={WINNING_PEG_DIAMETER + WINNING_PEG_CLEARANCE * 2}
      />
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
        {hasWon && <ReactConfetti gravity={0.3} numberOfPieces={150} run recycle={doCelebration} />}
        {hasWon && !doCelebration && <button onClick={() => resetGame()}>Reset</button>}
      </div>
    </div>
  );
}
