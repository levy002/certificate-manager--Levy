import {
  createContext,
  useCallback,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface LookupContextProps<T, F> {
  showLookup: boolean;
  setShowLookup: (show: boolean) => void;
  selectedItem: T;
  setSelectedItem: (name: T) => void;
  filterCriteria: F;
  setFilterCriteria: (criteria: F) => void;
}

const LookupContext = createContext<LookupContextProps<any, any> | undefined>(
  undefined,
);

const LookupProvider = <T, F>({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [showLookup, setShowLookup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<F | null>(null);

  const handleShowLookup = useCallback((show: boolean) => {
    setShowLookup(show);
  }, []);

  const handleSelectedItem = useCallback((item: T | null) => {
    setSelectedItem(item);
  }, []);

  const handleFilterCriteria = useCallback((criteria: F | null) => {
    setFilterCriteria(criteria);
  }, []);

  const contextValues = useMemo(
    () => ({
      showLookup,
      setShowLookup: handleShowLookup,
      selectedItem,
      setSelectedItem: handleSelectedItem,
      filterCriteria,
      setFilterCriteria: handleFilterCriteria,
    }),
    [
      showLookup,
      setSelectedItem,
      filterCriteria,
      handleShowLookup,
      handleSelectedItem,
      handleFilterCriteria,
    ],
  );

  return (
    <LookupContext.Provider value={contextValues}>
      {children}
    </LookupContext.Provider>
  );
};

export { LookupContext, LookupProvider };
