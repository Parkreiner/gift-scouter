import { useId } from "react";
import { GiftIdea } from "../../sharedTypesAndConstants";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import { writeGiftsToLocalStorage } from "../../helpers/localStorage";
import useDraftReducer from "./useDraftReducer";
import styles from "./GiftForm.module.css";
import { Heart } from "react-feather";

type FieldInfo = {
  name: Exclude<keyof GiftIdea, "tags">;
  displayName?: string;
  optional: boolean;
  type: "text" | "number";
};

const formFieldInfo: readonly FieldInfo[] = [
  {
    name: "description",
    displayName: "Gift idea",
    optional: false,
    type: "text",
  },
  {
    name: "for",
    optional: true,
    type: "text",
  },
  {
    name: "link",
    optional: true,
    type: "text",
  },
  {
    name: "price",
    optional: true,
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
  const currentGifts = useGifts();
  const [draftState, dispatch] = useDraftReducer();
  const { setGifts } = useGiftUpdaters();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGifts = [...currentGifts, draftState];

    writeGiftsToLocalStorage(newGifts);
    setGifts(newGifts);
    dispatch({ type: "submitted" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {formFieldInfo.map(({ name, displayName, optional, type }) => {
        const id = `${hookId}-${name}`;
        const availableName = displayName ?? toTitleCase(name);
        const optionalTag = optional ? " (optional)" : "";

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
              required={!optional}
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
