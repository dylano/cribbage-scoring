import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import styles from "./Player.module.css";

interface PlayerProps {
  playerId: number;
  winner: number;
  flipped?: boolean;
  triggerWin: (id: number) => void;
}

export default function Player({ playerId, winner, flipped, triggerWin }: PlayerProps) {
  const hasWon = winner === playerId;
  const [shouldCelebrate, setShouldCelebrate] = useState(false);

  // Drive the confetti burst off the derived win state so a reset (winner -> 0)
  // fully unwinds it — no stale local flag left behind.
  useEffect(() => {
    if (!hasWon) {
      setShouldCelebrate(false);
      return;
    }
    setShouldCelebrate(true);
    const timer = setTimeout(() => setShouldCelebrate(false), 1500);
    return () => clearTimeout(timer);
  }, [hasWon]);

  const classNames = [styles.player, flipped && styles.flipped].filter(Boolean).join(" ");

  return (
    <div
      className={classNames}
      style={{ "--player-color": `var(--color-player${playerId})` } as React.CSSProperties}
    >
      <button onClick={() => triggerWin(playerId)}>Win</button>
      <div
        style={{
          minHeight: 200,
        }}
      >
        {hasWon && (
          <ReactConfetti gravity={0.2} numberOfPieces={150} run recycle={shouldCelebrate} />
        )}
        {hasWon && !shouldCelebrate && <button onClick={() => triggerWin(0)}>Reset</button>}
      </div>
    </div>
  );
}
