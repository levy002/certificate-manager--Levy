import {
  createContext,
  useCallback,
  useState,
  ReactNode,
  useMemo,
} from 'react';

import { Supplier } from '../types/types';

interface LookupContextProps {
  showLookup: boolean;
  setShowLookup: (show: boolean) => void;
  lookupTitle: string;
  setLookupTitle: (title: string) => void;
  selectedSupplier: Supplier;
  setSelectedSupplier: (name: Supplier) => void;
  filterCriteria: Record<string, string> | null;
  setFilterCriteria: (criteria: Record<string, string> | null) => void;
}

const LookupContext = createContext<LookupContextProps | undefined>(undefined);

const LookupProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [showLookup, setShowLookup] = useState(false);
  const [lookupTitle, setLookupTitle] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>({
    name: '',
    index: '',
    city: '',
  });
  const [filterCriteria, setFilterCriteria] = useState<Record<
    string,
    string
  > | null>(null);

  const handleShowLookup = useCallback((show: boolean) => {
    setShowLookup(show);
  }, []);

  const handleLookupTitle = useCallback((title: string) => {
    setLookupTitle(title);
  }, []);

  const handleSelectedSupplier = useCallback((item: Supplier) => {
    setSelectedSupplier(item);
  }, []);

  const handleFilterCriteria = useCallback(
    (criteria: Record<string, string> | null) => {
      return setFilterCriteria(criteria);
    },
    [],
  );

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
