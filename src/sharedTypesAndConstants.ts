export type GiftIdea = Readonly<{
  id: string;
  description: string;
  for: string;
  link: string;
  price: number;
  tags: readonly string[];
}>;

export type GiftIdeaWithoutId = Omit<GiftIdea, "id">;
