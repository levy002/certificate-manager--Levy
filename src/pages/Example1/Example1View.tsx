import { useContext } from 'react';

import CertificatesTable from '../../components/certificates/CertificateTable';
import MenuNavLink from '../../components/Sidebar/MenuNavLink';
import { CertificatesContext } from '../../contexts/certificatesContext';

const Example1View: React.FC = () => {
  const { certificates, loading, error } = useContext(CertificatesContext)!;

  return (
    <section>
      <h2>Example 1</h2>
      <div className="table__new-certificate">
        <MenuNavLink
          to="/machineLearning/example1/certificates/new"
          desc="New Certificate"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <CertificatesTable certificates={certificates} />}
    </section>
  );
};

export default Example1View;
