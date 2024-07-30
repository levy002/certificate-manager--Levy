import { useContext } from 'react';

import { useI18n } from '../../contexts/languageContext';
import { LookupContext } from '../../contexts/LookupContext';
import { SuppliersContext } from '../../contexts/suppliersContext';
import LookupModal from '../Lookup/LookupModal/LookupModal';

const SupplierLookup: React.FC = () => {
  const { translate } = useI18n();
  const { suppliers, error, loading } = useContext(SuppliersContext)!;
  const { lookupTitle } = useContext(LookupContext)!;

  return (
    <LookupModal
      title={translate(lookupTitle)}
      loading={loading}
      error={error}
      data={suppliers}
    />
  );
};

export default SupplierLookup;
