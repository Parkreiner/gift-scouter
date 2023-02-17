import { useEffect } from "react";
import { useGifts } from "../GiftsContext";
import GiftForm from "../GiftForm";
import styles from "./GiftContainer.module.css";
import { writeGiftsToLocalStorage } from "../../helpers/localStorage";
import FilteredDisplay from "../FilteredDisplay";

export default function GiftContainer() {
  const currentGifts = useGifts();

  useEffect(() => {
    writeGiftsToLocalStorage(currentGifts);
  }, [currentGifts]);

  return (
    <div className={styles.giftContainer}>
      <main>
        <GiftForm />
        <FilteredDisplay />
      </main>
    </div>
  );
}
