import { useReducer } from "react";
import { GiftIdea } from "../../sharedTypesAndConstants";

type DraftGift = Omit<GiftIdea, "id">;
type DraftField = Exclude<keyof DraftGift, "tags">;

type DraftAction =
  | {
      type: "fieldChanged";
      payload: { field: DraftField; value: string };
    }
  | { type: "tagAdded"; payload: { value: string } }
  | { type: "submitted" };

const emptyDraft = {
  description: "",
  for: "",
  link: "",
  price: 0,
  tags: [],
} as const satisfies DraftGift;

function reduceDraft(draft: DraftGift, action: DraftAction): DraftGift {
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
      return emptyDraft;
    }

    default: {
      throw new Error("Unknown action type detected");
    }
  }
}

export default function useDraftReducer() {
  return useReducer(reduceDraft, emptyDraft);
}
