/**
 * Take a look at GiftContainer.tsx - I wasn't sure what you were going for, but
 * it might make sense to rip out the <section> element there and paste it in
 * your output here
 */

import { useState } from "react";
import debounce from "lodash.debounce";
import { useGifts } from "../GiftsContext";
import GiftItem from "../GiftItem";

function SortBar() {
  const [filterCriteria, setFilterCriteria] = useState("");
  const currentGifts = useGifts();
  const filteredGifts = currentGifts.filter((gift) => {
    return Object.values(gift).some((giftValue) => {
      if (typeof giftValue === "number") {
        return String(giftValue).includes(filterCriteria);
      }

      if (Array.isArray(giftValue)) {
        return giftValue.some((v) => v.includes(filterCriteria));
      }

      return giftValue.includes(filterCriteria);
    });
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={filterCriteria}
        onChange={(e) => setFilterCriteria(e.target.value)}
      />
      {filteredGifts.map((gift, index) => (
        <GiftItem key={index} gift={gift} />
      ))}
    </div>
  );
}

export default SortBar;
