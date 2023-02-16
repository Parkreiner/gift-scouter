/**
 * Take a look at GiftContainer.tsx - I wasn't sure what you were going for, but
 * it might make sense to rip out the <section> element there and paste it in
 * your output here
 */

import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { useGifts } from "../GiftsContext";

function SortBar() {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const data = useGifts();

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredData}
    </div>
  );
}

export default SortBar;
