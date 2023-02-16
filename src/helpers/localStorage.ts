import { GiftIdea } from "../sharedTypesAndConstants";
import { isGiftIdea } from "./gifts";

const giftKey = "gift-scouter-giftIdeas";

export function writeGiftsToLocalStorage(gifts: readonly GiftIdea[]): void {
  const serialized = JSON.stringify(gifts);
  window.localStorage.setItem(giftKey, serialized);
}

export function getGiftsFromLocalStorage(): readonly GiftIdea[] {
  const retrieved = window.localStorage.getItem(giftKey);

  try {
    if (!retrieved) throw new Error("No valid value retrieved");
    const parsed: unknown = JSON.parse(retrieved);

    if (!Array.isArray(parsed)) {
      throw new Error("Parsed value is not an array");
    }

    return parsed.filter(isGiftIdea);
  } catch (err) {
    console.error(err);

    const fallbackArray: readonly GiftIdea[] = [];
    writeGiftsToLocalStorage(fallbackArray);
    return fallbackArray;
  }
}
