import { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as CloseSVG } from '../../../../assets/images/close.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import SVGIcon from '../../../svgIcon/SVGIcon';
import LookupForm from '../lookupForm/LookupForm';
import './LookupModal.css';
import LookupTable from '../lookupTable/LookupTable';
import { SupplierDto } from '../../../../generated-sources/typesAndServices';
import apiClient from '../../../../api/clientApi';

interface SupplierLookupModalProps {
  onClose: () => void;
  handleSelectedSupplier: (supplier: SupplierDto | null) => void;
  preSelectedSupplier: SupplierDto | null;
}

const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  onClose,
  handleSelectedSupplier,
  preSelectedSupplier,
}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
  const { translate } = useI18n();

  useEffect(() => {
    dialogRef.current?.showModal();
    return (): void => {
      dialogRef.current?.close();
    };
  }, []);

  const handleClose = (): void => {
    dialogRef.current?.close();
    onClose();
  };

  const handleChangeSelectedSupplier = (supplier: SupplierDto | null): void => {
    handleSelectedSupplier(supplier);
    handleClose();
  };

  const handleFilterCriteria = useCallback(
    async (criteria: SupplierDto | null): Promise<void> => {
      if (criteria) {
        try {
          const supplier = await apiClient.searchSuppliers({name: criteria.name, city: criteria.city, id: criteria.id ? String(criteria.id) : ""})
          if (supplier) {
            setSuppliers(supplier.data.data);
          } else {
            setSuppliers([]);
          }
        } catch (error) {
          setSuppliers([]);
        }
      } else {
        setSuppliers([]);
      }
    },
    [],
  );

  return (
    <dialog
      ref={dialogRef}
      className="lookup-wrapper"
    >
      <section className="lookup-container">
        <div className="lookup-container__header">
          <h3 className="lookup-container__title">
            {translate('search_for_supplier')}
          </h3>
          <SVGIcon
            Icon={CloseSVG}
            fill="#565757"
            onClick={handleClose}
          />
        </div>
        <LookupForm
          handleFilterCriteria={handleFilterCriteria}
          initialFilterCriteria={preSelectedSupplier}
        />
        <LookupTable
          handleSelectedSupplier={handleChangeSelectedSupplier}
          data={suppliers}
          closeModal={onClose}
        />
      </section>
    </dialog>
  );
};

export default SupplierLookupModal;
