import { Certificate, CertificateType } from '../../types/types';
import './certificateTable.css';

const certificates: Certificate[] = [
  {
    id: 1,
    supplier: 'DAIMLER AG, 1, Berlin',
    certificateType: CertificateType.PermissionOfPrinting,
    validFrom: new Date('2017-08-21'),
    validTo: new Date('2017-08-26'),
  },
  {
    id: 2,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.OHSAS18001,
    validFrom: new Date('2017-08-18'),
    validTo: new Date('2017-08-24'),
  },
  {
    id: 3,
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.PermissionOfPrinting,
    validFrom: new Date('2017-10-14'),
    validTo: new Date('2017-10-20'),
  },
];

const CertificatesTable: React.FC = () => {
  return (
    <section className="table">
      <h2 className="table__title">Example1</h2>
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
                    {certificate.validFrom.toLocaleDateString('de-DE')}
                  </td>
                  <td className="table__cell">
                    {certificate.validTo.toLocaleDateString('de-DE')}
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
