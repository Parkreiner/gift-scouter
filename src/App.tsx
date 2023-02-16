import { useEffect } from "react";
import "./App.css";
import GiftForm from "./components/GiftForm";
import GiftsContext, { useGiftUpdaters } from "./components/GiftsContext";
import { getGiftsFromLocalStorage } from "./helpers/localStorage";

function AppContainer() {
  const { setGifts } = useGiftUpdaters();

  useEffect(() => {
    const cachedGifts = getGiftsFromLocalStorage();
    setGifts(cachedGifts);
  }, [setGifts]);

  return (
    <div className="App">
      <main>
        <GiftForm />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <GiftsContext>
      <AppContainer />
    </GiftsContext>
  );
}
