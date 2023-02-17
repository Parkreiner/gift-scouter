import { useEffect } from "react";
import styles from "./GiftContainer.module.css";

import { useGifts } from "@/components/GiftsContext";
import GiftForm from "@/components/GiftForm";
import { writeGiftsToLocalStorage } from "@/helpers/localStorage";
import FilteredDisplay from "@/components/FilteredDisplay";

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
