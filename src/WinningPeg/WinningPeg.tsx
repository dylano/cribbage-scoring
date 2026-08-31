import { useRef } from "react";
import styles from "./WinningPeg.module.css";

interface WinnerProps {
  winner: number;
}

export default function WinningPeg({ winner }: WinnerProps) {
  const pegRef = useRef<HTMLDivElement>(null);

  pegRef?.current?.style.setProperty("--color-winner", `var(--color-player${winner}`);

  return <div className={styles.peg} ref={pegRef} />;
}
