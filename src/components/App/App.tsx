import "./App.css";
import GiftsContext from "../GiftsContext";
import GiftContainer from "../GiftContainer";

export default function App() {
  return (
    <GiftsContext>
      <GiftContainer />
    </GiftsContext>
  );
}
