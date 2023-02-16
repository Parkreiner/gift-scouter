import { useEffect } from "react";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import GiftForm from "../GiftForm";
import GiftItem from "../GiftItem";
import styles from "./GiftContainer.module.css";
import { writeGiftsToLocalStorage } from "../../helpers/localStorage";

export default function GiftContainer() {
  const currentGifts = useGifts();
  const { removeGift } = useGiftUpdaters();

  // Updates local storage as gifts change
  useEffect(() => {
    writeGiftsToLocalStorage(currentGifts);
  }, [currentGifts]);

  return (
    <div className={styles.giftContainer}>
      <main>
        <GiftForm />

        <section className={styles.giftList}>
          {/** @todo - Update rest of code so key is more stable */}
          {currentGifts.map((gift, index) => (
            <GiftItem
              key={index}
              gift={gift}
              onDelete={() => removeGift(index)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
