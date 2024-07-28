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
  lookupTitle: string;
  setLookupTitle: (title: string) => void;
  selectedSupplier: T;
  setSelectedSupplier: (name: T) => void;
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
  const [lookupTitle, setLookupTitle] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<T | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<F | null>(null);

  const handleShowLookup = useCallback((show: boolean) => {
    setShowLookup(show);
  }, []);

  const handleLookupTitle = useCallback((title: string) => {
    setLookupTitle(title);
  }, []);

  const handleSelectedSupplier = useCallback((item: T | null) => {
    setSelectedSupplier(item);
  }, []);

  const handleFilterCriteria = useCallback((criteria: F | null) => {
    setFilterCriteria(criteria);
  }, []);

  const contextValues = useMemo(
    () => ({
      showLookup,
      setShowLookup: handleShowLookup,
      selectedSupplier,
      setSelectedSupplier: handleSelectedSupplier,
      filterCriteria,
      lookupTitle,
      setFilterCriteria: handleFilterCriteria,
      setLookupTitle: handleLookupTitle,
    }),
    [
      showLookup,
      setSelectedSupplier,
      filterCriteria,
      lookupTitle,
      handleShowLookup,
      handleSelectedSupplier,
      handleFilterCriteria,
      handleLookupTitle,
    ],
  );

  return (
    <LookupContext.Provider value={contextValues}>
      {children}
    </LookupContext.Provider>
  );
};

export { LookupContext, LookupProvider };
