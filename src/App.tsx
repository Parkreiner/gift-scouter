import { PropsWithChildren, useEffect } from "react";
import "./App.css";
import GiftForm from "./components/GiftForm";
import GiftsContext, { useGiftUpdaters } from "./components/GiftsContext";
import { getGiftsFromLocalStorage } from "./helpers/localStorage";

function Main({ children }: PropsWithChildren) {
  const { setGifts } = useGiftUpdaters();

  useEffect(() => {
    const cachedGifts = getGiftsFromLocalStorage();
    setGifts(cachedGifts);
  }, [setGifts]);

  return <main>{children}</main>;
}

function App() {
  return (
    <GiftsContext>
      <div className="App">
        <Main>
          <GiftForm />
        </Main>
      </div>
    </GiftsContext>
  );
}

export default App;
