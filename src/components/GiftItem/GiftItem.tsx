import { GiftIdea } from "../../sharedTypesAndConstants";
import { X as Close, ArrowRight } from "react-feather";
import styles from "./GiftItem.module.css";

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
    <article className={styles.giftItem}>
      {typeof onDelete === "function" && (
        <button type="button" className={styles.button} onClick={onDelete}>
          <Close size={16} />
        </button>
      )}

      <div className={styles.header}>
        {link.length === 0 ? (
          <h2>{description}</h2>
        ) : (
          <a href={link}>
            <h2>
              {description}
              <ArrowRight size={24} />
            </h2>
          </a>
        )}
      </div>

      <section className={styles.bonusInfo}>
        {recipient.length > 0 && <em>For {recipient}</em>}
        {price > 0 && <span>{currencyConverter.format(price)}</span>}
      </section>

      {tags.map((tag, index) => (
        <span key={index} className={styles.giftTag}>
          {tag}
        </span>
      ))}
    </article>
  );
}
