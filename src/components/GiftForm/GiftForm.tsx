import { useId } from "react";
import { GiftIdea } from "../../sharedTypesAndConstants";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import { writeGiftsToLocalStorage } from "../../helpers/localStorage";
import useDraftReducer from "./useDraftReducer";

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
    <form onSubmit={handleSubmit}>
      {formFieldInfo.map(({ name, displayName, optional, type }) => {
        const id = `${hookId}-${name}`;
        const availableName = displayName ?? name;
        const optionalTag = optional ? " (optional)" : "";

        return (
          <label key={id} htmlFor={id}>
            {availableName}
            {optionalTag}
            <input
              id={id}
              type={type}
              name={name}
              required={!optional}
              title={name === "description" ? "Blah" : undefined}
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

      <button type="submit">Save</button>
    </form>
  );
}
