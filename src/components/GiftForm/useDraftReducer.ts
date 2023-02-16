import { useReducer } from "react";
import { GiftIdea } from "../../sharedTypesAndConstants";

type DraftAction =
  | {
      type: "fieldChanged";
      payload: { field: Exclude<keyof GiftIdea, "tags">; value: string };
    }
  | { type: "tagAdded"; payload: { value: string } }
  | { type: "submitted" };

const initialDraftState = {
  description: "",
  for: "",
  link: "",
  price: 0,
  tags: [],
} as const satisfies GiftIdea;

function reduceDraft(draft: GiftIdea, action: DraftAction): GiftIdea {
  switch (action.type) {
    case "fieldChanged": {
      const { field, value } = action.payload;
      const newValue = field === "price" ? Number(value) : value;
      return { ...draft, [field]: newValue };
    }

    case "tagAdded": {
      const { value } = action.payload;
      return { ...draft, tags: [...draft.tags, value] };
    }

    case "submitted": {
      return initialDraftState;
    }

    default: {
      throw new Error("Unknown action type detected");
    }
  }
}

export default function useDraftReducer() {
  return useReducer(reduceDraft, initialDraftState);
}
