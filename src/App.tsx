import { useState } from "react";
import styles from "./App.module.css";
import WinningPeg from "./WinningPeg/WinningPeg.tsx";
import Player from "./Player/Player.tsx";

export function App() {
  const [winner, setWinner] = useState(0);

  return (
    <div className={styles.app}>
      <Player playerId={1} winner={winner} flipped triggerWin={setWinner} />
      <WinningPeg winner={winner} />
      <Player playerId={2} winner={winner} triggerWin={setWinner} />
    </div>
  );
}
