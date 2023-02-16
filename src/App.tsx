import "./App.css";

import GiftsContext from "./components/GiftsContext";
import GiftContainer from "./components/GiftContainer";

export default function App() {
  return (
    <GiftsContext>
      <GiftContainer />
    </GiftsContext>
  );
}
