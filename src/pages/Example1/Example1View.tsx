import { useContext } from 'react';

import CertificatesTable from '../../components/certificates/CertificateTable';
import MenuNavLink from '../../components/Sidebar/MenuNavLink';
import { CertificatesContext } from '../../contexts/certificatesContext';
import { useI18n } from '../../contexts/languageContext';

const Example1View: React.FC = () => {
  const { certificates, loading, error } = useContext(CertificatesContext)!;
  const { translate } = useI18n();

  return (
    <section>
      <h2>{translate('Example1')}</h2>
      <div className="table__new-certificate">
        <MenuNavLink
          to="/machineLearning/example1/certificates/new"
          desc={translate('New Certificate')}
        />
      </div>
      {loading && <p>{translate('Loading')}...</p>}
      {error && (
        <p>
          {translate('Error')}: {error}
        </p>
      )}
      {!loading && !error && <CertificatesTable certificates={certificates} />}
    </section>
  );
};

export default Example1View;
