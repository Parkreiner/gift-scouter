import { useId, useState } from "react";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import GiftItem from "../GiftItem";
import { GiftIdea } from "../../sharedTypesAndConstants";
import styles from "./SortBar.module.css";

function filterGifts<G extends GiftIdea>(
  gifts: readonly G[],
  criteria: string
): readonly G[] {
  if (criteria === "") {
    return gifts;
  }

  const normalized = criteria.toUpperCase();

  return gifts.filter((gift) => {
    return Object.values(gift).some((giftValue) => {
      if (typeof giftValue === "number") {
        return String(giftValue).includes(normalized);
      }

      // For some reason, TypeScript is glitching out with the types here
      if (Array.isArray(giftValue)) {
        return giftValue.some((v: string) =>
          v.toUpperCase().includes(normalized)
        );
      }

      return (giftValue as string).toUpperCase().includes(normalized);
    });
  });
}

export default function SortBar() {
  const hookId = useId();
  const [filterCriteria, setFilterCriteria] = useState("");
  const currentGifts = useGifts();
  const { removeGift } = useGiftUpdaters();

  const filtered = filterGifts(currentGifts, filterCriteria);
  const sortBarId = `${hookId}-sortBar`;

  return (
    <div>
      <label htmlFor={sortBarId}>
        Filter Results
        <input
          id={sortBarId}
          className={styles.sortBar}
          type="text"
          placeholder="Search"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        />
      </label>

      <section className={styles.giftList}>
        {filtered.map((gift) => (
          <GiftItem
            key={gift.id}
            gift={gift}
            onDelete={() => removeGift(gift.id)}
          />
        ))}
      </section>
    </div>
  );
}
