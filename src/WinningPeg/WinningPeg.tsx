import styles from "./WinningPeg.module.css";

interface WinnerProps {
  winner: number;
}

export default function WinningPeg({ winner }: WinnerProps) {
  // Only set the winner color when there's a winner; the CSS supplies an
  // opaque default otherwise so the peg never goes see-through.
  const style = winner
    ? ({ "--color-winner": `var(--color-player${winner})` } as React.CSSProperties)
    : undefined;

  return <div className={styles.peg} style={style} />;
}
