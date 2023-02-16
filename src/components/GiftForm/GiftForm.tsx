import { useId } from "react";
import { useGiftUpdaters } from "../GiftsContext";

function useFormIds() {
  const hookId = useId();
  return {
    description: `${hookId}-description`,
    for: `${hookId}-for`,
    link: `${hookId}-link`,
    price: `${hookId}-price`,
  };
}

function GiftForm() {
  const { addGift } = useGiftUpdaters();
  const ids = useFormIds();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as Record<string, string>;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={ids.description}>
        Gift idea:
        <input id={ids.description} type="text" name="description" />
      </label>

      <label htmlFor={ids.for}>
        For (optional):
        <input id={ids.for} type="text" name="for" />
      </label>

      <label htmlFor={ids.link}>
        Link (optional):
        <input id={ids.link} type="url" name="link" />
      </label>

      <label htmlFor={ids.price}>
        Price (optional):
        <input id={ids.price} type="number" min={0} max={99_999} name="price" />
      </label>

      <button type="submit">Save</button>
    </form>
  );
}

export default GiftForm;
