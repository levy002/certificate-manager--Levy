import { useContext } from 'react';

import { useI18n } from '../../contexts/languageContext';
import { LookupContext } from '../../contexts/LookupContext';
import { UsersContext } from '../../contexts/usersContext';
import LookupModal from '../Lookup/LookupModal/LookupModal';

const UsersLookup: React.FC = () => {
  const { translate } = useI18n();
  const { users, error, loading } = useContext(UsersContext)!;
  const { lookupTitle } = useContext(LookupContext)!;

  return (
    <LookupModal
      title={translate(lookupTitle)}
      loading={loading}
      error={error}
      data={users}
    />
  );
};

export default UsersLookup;
