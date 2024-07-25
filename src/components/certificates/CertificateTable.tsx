import { Certificate } from '../../types/types';
import './certificateTable.css';

type CertificateTableProps = {
  certificates: Certificate[];
};

const CertificatesTable: React.FC<CertificateTableProps> = ({
  certificates,
}) => {
  return (
    <section className="table">
      {certificates.length > 0 ? (
        <section className="table__container">
          <table className="table__content">
            <thead className="table__head">
              <tr className="table__row">
                <th className="table__header">Supplier</th>
                <th className="table__header">Certificate Type</th>
                <th className="table__header">Valid from</th>
                <th className="table__header">Valid to</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {certificates.map((certificate) => (
                <tr
                  key={certificate.id}
                  className="table__row"
                >
                  <td className="table__cell">{certificate.supplier}</td>
                  <td className="table__cell">{certificate.certificateType}</td>
                  <td className="table__cell">
                    {certificate.validFrom?.toLocaleDateString('de-DE')}
                  </td>
                  <td className="table__cell">
                    {certificate.validTo?.toLocaleDateString('de-DE')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <h4>No certificates available.</h4>
      )}
    </section>
  );
};

export default CertificatesTable;
