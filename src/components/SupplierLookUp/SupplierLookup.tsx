import { useContext } from 'react';

import { LookupContext } from '../../contexts/LookupContext';
import { SuppliersContext } from '../../contexts/suppliersContext';
import LookupModal from '../Lookup/LookupModal/LookupModal';

const SupplierLookup: React.FC = () => {
  const { suppliers, error, loading } = useContext(SuppliersContext)!;
  const { lookupTitle } = useContext(LookupContext)!;

  return (
    <LookupModal
      title={lookupTitle}
      loading={loading}
      error={error}
      data={suppliers}
    />
  );
};

export default SupplierLookup;
