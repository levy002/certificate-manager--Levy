import { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as CloseSVG } from '../../../assets/images/close.svg';
import { useI18n } from '../../../contexts/LanguageContext';
import { getSupplierByIndex } from '../../../data/DB';
import { Supplier } from '../../../types/Types';
import SVGIcon from '../../svgIcon/SVGIcon';
import LookupForm from '../lookupForm/LookupForm';
import './LookupModal.css';
import LookupTable from '../lookupTable/LookupTable';

interface SupplierLookupModalProps {
  onClose: () => void;
  handleSelectedSupplier: (supplier: Supplier | null) => void;
  preSelectedSupplier: Supplier | null;
}

const SupplierLookupModal: React.FC<SupplierLookupModalProps> = ({
  onClose,
  handleSelectedSupplier,
  preSelectedSupplier,
}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
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

  const handleChangeSelectedSupplier = (supplier: Supplier | null): void => {
    handleSelectedSupplier(supplier);
    handleClose();
  };

  const handleFilterCriteria = useCallback(
    async (criteria: Supplier | null): Promise<void> => {
      if (criteria?.index) {
        try {
          const supplier = await getSupplierByIndex(criteria.index);
          if (supplier) {
            setSuppliers([supplier]);
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
