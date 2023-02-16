import { GiftIdea } from "../sharedTypesAndConstants";

export function writeGiftsToLocalStorage(gifts: readonly GiftIdea[]): void {
  const serialized = JSON.stringify(gifts);
  window.localStorage.setItem("gift", serialized);
}

// Not implmeneted yet
export function getGiftsFromLocalStorage(): readonly GiftIdea[] {
  return [];
}
