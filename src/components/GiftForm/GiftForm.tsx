import { useId } from "react";
import { GiftIdea } from "../../sharedTypesAndConstants";
import { useGiftUpdaters } from "../GiftsContext";
import useDraftReducer from "./useDraftReducer";
import styles from "./GiftForm.module.css";
import { Heart } from "react-feather";

type FieldInfo = {
  name: Exclude<keyof GiftIdea, "id" | "tags">;
  displayName?: string;
  required: boolean;
  type: "text" | "number";
};

const formFieldInfo: readonly FieldInfo[] = [
  {
    name: "description",
    displayName: "Gift idea",
    required: true,
    type: "text",
  },
  {
    name: "for",
    required: false,
    type: "text",
  },
  {
    name: "link",
    required: false,
    type: "text",
  },
  {
    name: "price",
    required: false,
    type: "number",
  },
];

function toTitleCase(str: string): string {
  const snakecaseBoundaryMatcher = /(?<=[a-z])(?=[A-Z])/g;
  return str
    .split(snakecaseBoundaryMatcher)
    .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase())
    .join(" ");
}

export default function GiftForm() {
  const hookId = useId();
  const [draftState, dispatch] = useDraftReducer();
  const { addGift } = useGiftUpdaters();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGift = {
      ...draftState,
      id: String(Math.random()).slice(2),
    };

    addGift(newGift);
    dispatch({ type: "submitted" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {formFieldInfo.map(({ name, displayName, required, type }) => {
        const id = `${hookId}-${name}`;
        const availableName = displayName ?? toTitleCase(name);
        const optionalTag = required ? "" : " (optional)";

        return (
          <label key={id} htmlFor={id} className={styles.label}>
            <div className={styles.labelText}>
              {availableName}
              <em>{optionalTag}</em>
            </div>

            <input
              id={id}
              type={type}
              name={name}
              required={required}
              autoComplete="off"
              value={draftState[name]}
              onChange={(e) => {
                dispatch({
                  type: "fieldChanged",
                  payload: { field: name, value: e.target.value },
                });
              }}
            />
          </label>
        );
      })}

      <button type="submit" className={styles.submitButton}>
        <Heart size={16} />
        Save
      </button>
    </form>
  );
}
