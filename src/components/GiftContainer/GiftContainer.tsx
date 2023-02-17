import { useEffect } from "react";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import GiftForm from "../GiftForm";
import GiftItem from "../GiftItem";
import styles from "./GiftContainer.module.css";
import { writeGiftsToLocalStorage } from "../../helpers/localStorage";
import SortBar from "../SortBar";

export default function GiftContainer() {
  const currentGifts = useGifts();

  // Updates local storage as gifts change
  useEffect(() => {
    writeGiftsToLocalStorage(currentGifts);
  }, [currentGifts]);

  return (
    <div className={styles.giftContainer}>
      <main>
        <GiftForm />
        <SortBar />
      </main>
    </div>
  );
}
