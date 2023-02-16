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
