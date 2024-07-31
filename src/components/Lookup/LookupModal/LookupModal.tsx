import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as CloseSVG } from '../../../assets/images/close.svg';
import { Supplier } from '../../../types/types';
import SVGIcon from '../../SVGIcon/SVGIcon';
import LookupForm from '../LookupForm/LookupForm';
import './LookupModal.css';
import LookupTable from '../LookupTable/LookupTable';

interface LookupModalProps {
  data: Supplier[];
  title: string;
  filters: Supplier;
  onClose: () => void;
  handleSelectedSupplier: (supplier: Supplier) => void;
}

const LookupModal: React.FC<LookupModalProps> = ({
  title,
  filters,
  onClose,
  handleSelectedSupplier,
  data,
}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [filterCriteria, setFilterCriteria] = useState<Supplier>(filters);

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

  const handleChangeSelectedSupplier = (supplier: Supplier): void => {
    handleSelectedSupplier(supplier);
    handleClose();
  };

  const handleFilterCriteria = useCallback((criteria: Supplier): void => {
    setFilterCriteria(criteria);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="lookup-wrapper"
    >
      <section className="lookup-container">
        <div className="lookup-container__header">
          <h3 className="lookup-container__title">Search for {title}</h3>
          <SVGIcon
            Icon={CloseSVG}
            fill="#565757"
            onClick={handleClose}
          />
        </div>
        <LookupForm
          initialFilterCriteria={filters}
          handleFilterCriteria={handleFilterCriteria}
        />
        <LookupTable
          filterCriteria={filterCriteria}
          handleSelectedSupplier={handleChangeSelectedSupplier}
          data={data}
          closeModal={onClose}
          title={title}
        />
      </section>
    </dialog>
  );
};

export default LookupModal;
