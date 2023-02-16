import { GiftIdea, isGiftIdea } from "../sharedTypesAndConstants";

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

    if (!Array.isArray(parsed) || !parsed.every(isGiftIdea)) {
      throw new Error("Parsed value is not a valid array");
    }

    return parsed;
  } catch (err) {
    console.error(err);

    const fallbackArray: readonly GiftIdea[] = [];
    writeGiftsToLocalStorage(fallbackArray);
    return fallbackArray;
  }
}
