import { useEffect, useState } from 'react';

import { useI18n } from '../../contexts/languageContext';
import { getAllSuppliers } from '../../data/db';
import { Supplier } from '../../types/types';
import LookupModal from '../Lookup/LookupModal/LookupModal';

const SupplierLookup: React.FC = () => {
  const { translate } = useI18n();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = (): void => {
      setLoading(true);
      setError(null);
      getAllSuppliers()
        .then((data) => {
          setSuppliers(data);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err.message);
          setLoading(false);
        });
    };

    const timer = setTimeout(() => {
      fetchItems();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LookupModal
      title={translate('Supplier')}
      loading={loading}
      error={error}
      data={suppliers}
    />
  );
};

export default SupplierLookup;
