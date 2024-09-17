import React, { useState, useCallback } from 'react';

import { ReactComponent as GearSVG } from '../../assets/images/gear.svg';
import { useI18n } from '../../contexts/LanguageContext';
import { deleteCertificate } from '../../data/DB';
import { Certificate } from '../../types/Types';
import MenuNavLink from '../sidebar/MenuNavLink';
import SVGIcon from '../svgIcon/SVGIcon';
import './CertificateTable.css';

type CertificateTableProps = {
  certificates: Certificate[];
  refetch: () => void;
};

const CertificatesTable: React.FC<CertificateTableProps> = ({
  certificates,
  refetch,
}) => {
  const { translate } = useI18n();
  const [openGearCertificateId, setOpenGearCertificateId] = useState<
    number | null
  >(null);

  const toggleGearContents = useCallback((id: number): void => {
    setOpenGearCertificateId((prevId) => (prevId === id ? null : id));
  }, []);

  const handleGearClick = useCallback(
    (id: number): React.MouseEventHandler<SVGSVGElement> => {
      return (event) => {
        event.preventDefault();
        toggleGearContents(id);
      };
    },
    [toggleGearContents],
  );

  const handleDelete = useCallback(async (id: number): Promise<void> => {
    await deleteCertificate(id);
    refetch();
  }, []);

  const handleDeleteClick = useCallback(
    (id: number): React.MouseEventHandler<HTMLButtonElement> => {
      return async (event) => {
        event.preventDefault();
        await handleDelete(id);
      };
    },
    [handleDelete],
  );

  return (
    <section className="table">
      {certificates.length > 0 ? (
        <section className="table__container">
          <table className="table__content">
            <thead className="table__head">
              <tr className="table__row">
                <th className="table__header" />
                <th className="table__header">{translate('supplier')}</th>
                <th className="table__header">
                  {translate('certificate_type')}
                </th>
                <th className="table__header">{translate('valid_from')}</th>
                <th className="table__header">{translate('valid_to')}</th>
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
                          desc={translate('edit')}
                        />
                        <button
                          onClick={handleDeleteClick(certificate.id)}
                          type="button"
                        >
                          {translate('delete')}
                        </button>
                      </section>
                    )}
                  </td>
                  <td className="table__cell">{certificate?.supplier?.name}</td>
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
        <h4>{translate('no_certificates_available')}.</h4>
      )}
    </section>
  );
};

export default CertificatesTable;
