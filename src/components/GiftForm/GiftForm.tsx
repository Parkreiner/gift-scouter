import { useId, useReducer } from "react";
import { GiftIdea } from "../../sharedTypesAndConstants";
import { useGifts, useGiftUpdaters } from "../GiftsContext";
import { writeGiftsToLocalStorage } from "../../helpers/localStorage";

type ChangeableFieldKey = Exclude<keyof GiftIdea, "tags">;

type FieldInfo = {
  name: ChangeableFieldKey;
  displayName?: string;
  optional: boolean;
  type: "text" | "number";
};

type DraftAction =
  | {
      type: "fieldChanged";
      payload: { field: ChangeableFieldKey; value: string };
    }
  | { type: "tagsChanged"; payload: { value: string[] } }
  | { type: "submitted" };

const initialDraftState = {
  description: "",
  for: "",
  link: "",
  price: 0,
  tags: [],
} as const satisfies GiftIdea;

function reduceDraft(state: GiftIdea, action: DraftAction): GiftIdea {
  switch (action.type) {
    case "fieldChanged": {
      const { field, value } = action.payload;
      const newValue = field === "price" ? Number(value) : value;
      return { ...state, [field]: newValue };
    }

    case "tagsChanged": {
      // Not implemented yet
      return state;
    }

    case "submitted": {
      return initialDraftState;
    }

    default: {
      throw new Error("Unknown action type detected");
    }
  }
}

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
  const [draftState, dispatch] = useReducer(reduceDraft, initialDraftState);
  const currentGifts = useGifts();
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

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: "fieldChanged",
            payload: { field: name, value: e.target.value },
          });
        };

        return (
          <label key={id} htmlFor={id}>
            {availableName}
            {optionalTag}
            <input
              id={id}
              type={type}
              name={name}
              value={draftState[name]}
              onChange={onChange}
            />
          </label>
        );
      })}

      <button type="submit">Save</button>
    </form>
  );
}
