import styles from "./App.module.css";
import WinningPeg from "./WinningPeg/index.tsx";

export function App() {
  return (
    <div className={styles.app}>
      <div />
      <WinningPeg />
      <div />
    </div>
  );
}
