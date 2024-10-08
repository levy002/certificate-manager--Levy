import React, { useState, useCallback } from 'react';

import { ReactComponent as GearSVG } from '../../assets/images/gear.svg';
import { useI18n } from '../../contexts/LanguageContext';
import MenuNavLink from '../sidebar/MenuNavLink';
import SVGIcon from '../svgIcon/SVGIcon';
import './CertificateTable.css';
import { CertificateDto } from '../../generated-sources/typesAndServices';
import { formatDate } from '../../utils/FormatDate';
import apiClient from '../../api/clientApi';
import { triggerNotification } from '../notification/Notification';

type CertificateTableProps = {
  certificates: CertificateDto[];
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
    try {
      await apiClient.deleteCertificateById(id);
      triggerNotification(
        translate('certificate_deleted_successfully'),
        'success',
      );
    } catch (error) {
      triggerNotification(translate('failed_to_delete_certificate'), 'error');
    }
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
                          to={`/machineLearning/certificates/${certificate.id}`}
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
                  <td className="table__cell">
                    {certificate?.supplier?.name}, {certificate?.supplier?.id},{' '}
                    {certificate?.supplier?.city}
                  </td>
                  <td className="table__cell">
                    {certificate.certificateType === 'PERMISSION_OF_PRINTING'
                      ? translate('permission_of_printing')
                      : translate('ohsas_18001')}
                  </td>
                  <td className="table__cell">
                    {formatDate(certificate.validFrom)}
                  </td>
                  <td className="table__cell">
                    {formatDate(certificate.validTo)}
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
