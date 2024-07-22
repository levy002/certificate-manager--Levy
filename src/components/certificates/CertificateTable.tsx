import { Certificate, TableHeaders } from '../../types/types';
import './certificateTable.css';

type CertificateTableProps = {
  name: string;
  certificates?: Certificate[];
};

const CertificatesTable: React.FC<CertificateTableProps> = ({ name, certificates }) => {
  const tableHeaders = [
    TableHeaders.SUPPLIER,
    TableHeaders.CERTIFICATE_TYPE,
    TableHeaders.VALID_FROM,
    TableHeaders.VALID_TO,
  ];

  return (
    <section className="table">
      <h2 className="table__title">{name}</h2>
      {certificates && certificates.length > 0 ? (
        <section className="table__container">
          <table className="table__content">
            <thead className="table__head">
              <tr className="table__row">
                {tableHeaders.map(header => (
                  <th key={header} className="table__header">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table__body">
              {
                certificates.map((certificate, index) => (
                  <tr key={index} className="table__row">
                    <td className="table__cell"></td>
                    <td className="table__cell">{certificate.supplier}</td>
                    <td className="table__cell">{certificate.certificateType}</td>
                    <td className="table__cell">{certificate.validFrom}</td>
                    <td className="table__cell">{certificate.validTo}</td>
                  </tr>
                ))
              }
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

