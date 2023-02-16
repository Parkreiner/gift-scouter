import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { GiftIdea } from "../../sharedTypesAndConstants";

function useGiftSetup() {
  const [gifts, setGifts] = useState<readonly GiftIdea[]>([]);

  const addGift = useCallback((gift: GiftIdea) => {
    setGifts((prevGifts) => [...prevGifts, gift]);
  }, []);

  const updaters = useMemo(() => {
    return { addGift, setGifts };
  }, [addGift]);

  return { gifts: gifts, updaters } as const;
}

type Updaters = ReturnType<typeof useGiftSetup>["updaters"];
const UpdatersContext = createContext<null | Updaters>(null);
const ArrayContext = createContext<null | readonly GiftIdea[]>(null);

export function useGifts() {
  const contextValue = useContext(ArrayContext);
  if (contextValue === null) throw new Error("Provider value not defined.");
  return contextValue;
}

export function useGiftUpdaters() {
  const contextValue = useContext(UpdatersContext);
  if (contextValue === null) throw new Error("Provider value not defined.");
  return contextValue;
}

export default function GiftsContext({ children }: PropsWithChildren) {
  const { gifts, updaters } = useGiftSetup();

  return (
    <ArrayContext.Provider value={gifts}>
      <UpdatersContext.Provider value={updaters}>
        {children}
      </UpdatersContext.Provider>
    </ArrayContext.Provider>
  );
}
