export type GiftIdea = Readonly<{
  description: string;
  for: string;
  link: string;
  price: number;
  tags: readonly string[];
}>;

// Won't have time to move the codebase to using this, but for a long-term
// React app, having some kind of ID is going to be essential
export type GiftIdeaWithId = Readonly<{ id: string } & GiftIdea>;
