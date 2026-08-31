import styles from "./Player.module.css";

interface PlayerProps {
  playerId: number;
  flipped?: boolean;
  triggerWin: Function;
}

export default function Player({ playerId, flipped, triggerWin }: PlayerProps) {
  function handleWin() {
    console.log(`Player ${playerId} wins!`);
    triggerWin(playerId);
  }

  const classNames = [styles.player, flipped && styles.flipped].filter(Boolean).join(" ");

  return (
    <div
      className={classNames}
      style={{ "--player-color": `var(--color-player${playerId})` } as React.CSSProperties}
    >
      <button onClick={() => handleWin()}>Win</button>
    </div>
  );
}
