export type GiftIdea = Readonly<{
  description: string;
  for: string;
  link: string;
  price: number;
  tags: readonly string[];
}>;
