import { useEffect } from "react";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import { getGiftsFromLocalStorage } from "../../helpers/localStorage";
import GiftForm from "../GiftForm";
import GiftItem from "../GiftItem";

export default function GiftContainer() {
  const currentGifts = useGifts();
  const { setGifts, removeGift } = useGiftUpdaters();

  useEffect(() => {
    const cachedGifts = getGiftsFromLocalStorage();
    setGifts(cachedGifts);
  }, [setGifts]);

  return (
    <div className="App">
      <main>
        <GiftForm />

        <section className="giftList">
          {/** @todo - Update rest of code so key is more stable */}
          {currentGifts.map((gift, index) => (
            <GiftItem
              key={index}
              gift={gift}
              onDelete={() => removeGift(index)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
