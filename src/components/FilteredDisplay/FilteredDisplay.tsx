import { useId, useState } from "react";
import styles from "./FilteredDisplay.module.css";

import { useGifts, useGiftUpdaters } from "@/components/GiftsContext";
import GiftItem from "@/components/GiftItem";
import { GiftIdea } from "@/constants";
import { isReadOnlyArray } from "@/helpers/typePredicates";

function filterGifts<G extends GiftIdea>(
  gifts: readonly G[],
  criteria: string
): readonly G[] {
  if (criteria === "") {
    return gifts;
  }

  const normalized = criteria.toUpperCase();

  return gifts.filter((gift) => {
    return Object.entries(gift).some(([key, value]) => {
      if (key === "id") {
        return false;
      }

      if (typeof value === "number") {
        return String(value).includes(normalized);
      }

      if (isReadOnlyArray(value)) {
        return value.some((v) => v.toUpperCase().includes(normalized));
      }

      return value.toUpperCase().includes(normalized);
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
