import GiftsContext from "../GiftsContext";
import GiftContainer from "../GiftContainer";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.appContainer}>
      <h1>Gift Scouter</h1>
      <GiftsContext>
        <GiftContainer />
      </GiftsContext>
    </div>
  );
}
