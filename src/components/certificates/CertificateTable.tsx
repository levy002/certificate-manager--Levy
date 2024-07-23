import React, { useState } from 'react';

import { ReactComponent as GearSVG } from '../../assets/images/gear.svg';
import { Certificate } from '../../types/types';
import MenuNavLink from '../Sidebar/MenuNavLink';
import SVGIcon from '../SVGIcon/SVGIcon';
import './certificateTable.css';

type CertificateTableProps = {
  certificates: Certificate[];
};

const CertificatesTable: React.FC<CertificateTableProps> = ({
  certificates,
}) => {
  const [openGearCertificateId, setOpenGearCertificateId] = useState<
    number | null
  >(null);

  const toggleGearContents = (id: number): void => {
    setOpenGearCertificateId(openGearCertificateId === id ? null : id);
  };

  const handleGearClick = (
    id: number,
  ): React.MouseEventHandler<SVGSVGElement> => {
    return (event) => {
      event.preventDefault();
      toggleGearContents(id);
    };
  };

  return (
    <section className="table">
      {certificates.length > 0 ? (
        <section className="table__container">
          <table className="table__content">
            <thead className="table__head">
              <tr className="table__row">
                <th className="table__header" />
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
                  <td className="table__cell">
                    <SVGIcon
                      Icon={GearSVG}
                      fill="#3f9ac9"
                      onClick={handleGearClick(certificate.id)}
                    />
                    {openGearCertificateId === certificate.id && (
                      <section className="table__cell-gear-contents">
                        <MenuNavLink
                          to={`/machineLearning/example1/certificates/${certificate.id}`}
                          desc="Edit"
                        />
                      </section>
                    )}
                  </td>
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
