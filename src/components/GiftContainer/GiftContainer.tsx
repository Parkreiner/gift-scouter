import { useEffect } from "react";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import GiftForm from "../GiftForm";
import GiftItem from "../GiftItem";
import styles from "./GiftContainer.module.css";
import {
  getGiftsFromLocalStorage,
  writeGiftsToLocalStorage,
} from "../../helpers/localStorage";

export default function GiftContainer() {
  const currentGifts = useGifts();
  const { setGifts, removeGift } = useGiftUpdaters();

  // Initializes gifts on mount - setGifts is stable identity, so this runs once
  useEffect(() => {
    const parsedGifts = getGiftsFromLocalStorage();
    setGifts(parsedGifts);
    writeGiftsToLocalStorage(parsedGifts);
  }, [setGifts]);

  // Updates local storage as gifts change
  useEffect(() => {
    writeGiftsToLocalStorage(currentGifts);
  }, [currentGifts]);

  return (
    <div className="App">
      <main>
        <GiftForm />

        <section className="giftList">
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
