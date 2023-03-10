import { GiftIdea } from "../sharedTypesAndConstants";

export function isGiftIdea(value: unknown): value is GiftIdea {
  if (!value || typeof value !== "object") {
    return false;
  }

  for (const key in value) {
    if (typeof key === "symbol") {
      return false;
    }
  }

  const recast = value as Record<string, unknown>;

  return (
    "id" in recast &&
    typeof recast.id === "string" &&
    "description" in recast &&
    typeof recast.description === "string" &&
    "for" in recast &&
    typeof recast.for === "string" &&
    "link" in recast &&
    typeof recast.link === "string" &&
    "price" in recast &&
    typeof recast.price === "number" &&
    "tags" in recast &&
    Array.isArray(recast.tags) &&
    recast.tags.every((v) => typeof v === "string")
  );
}
