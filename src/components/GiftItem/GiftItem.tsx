import { GiftIdea } from "../../sharedTypesAndConstants";

type Props = {
  gift: GiftIdea;
  onDelete?: () => void;
};

const currencyConverter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function GiftItem({ gift, onDelete }: Props) {
  const { description, for: recipient, link, price, tags } = gift;

  return (
    <div className="gift-item-card">
      <h2>{description}</h2>

      {recipient.length > 0 && <em>For {recipient}</em>}
      {link.length > 0 && <a href={link}>Link</a>}
      {price > 0 && <span>{currencyConverter.format(price)}</span>}

      {tags.map((tag, index) => (
        <span key={index} className="gift-item-tag">
          {tag}
        </span>
      ))}

      {typeof onDelete === "function" && (
        <button type="button" onClick={onDelete}>
          X
        </button>
      )}
    </div>
  );
}
