import styles from "./App.module.css";

import GiftsContext from "@/components/GiftsContext";
import GiftContainer from "@/components/GiftContainer";

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
