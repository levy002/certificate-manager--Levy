import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ChevronSVG } from '../../../assets/images/chevron.svg';
import { Supplier } from '../../../types/types';
import dataFiltering from '../../../utils/filterFunction';
import Button from '../../Form/Button';
import './LookupTable.css';
import SVGIcon from '../../SVGIcon/SVGIcon';

interface LookupTableProps {
  data: Supplier[];
  filterCriteria: Supplier;
  handleSelectedSupplier: (supplier: Supplier) => void;
  closeModal: () => void;
  title: string;
}

const LookupTable: React.FC<LookupTableProps> = ({
  filterCriteria,
  handleSelectedSupplier,
  data,
  closeModal,
  title,
}): JSX.Element => {
  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier>(filterCriteria);

  const handleSupplierRowClick = useCallback(
    (supplier: Supplier): React.ChangeEventHandler<HTMLInputElement> => {
      return async (event) => {
        event.preventDefault();
        setSelectedSupplier(supplier);
      };
    },
    [],
  );

  const handleSelectSupplier = useCallback(() => {
    handleSelectedSupplier(selectedSupplier);
  }, [selectedSupplier]);

  const handleCancelSelectSupplier = useCallback(() => {
    closeModal();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => dataFiltering(item, filterCriteria));
  }, [filterCriteria, data]);

  const tableHeaders = filterCriteria ? Object.keys(filterCriteria) : [];

  return (
    <section className="lookup-table">
      <div className="lookup__header">
        <SVGIcon
          Icon={ChevronSVG}
          fill="#fff"
          width={12}
          height={10}
        />
        <p className="lookup__title">{title} List</p>
      </div>
      <section className="lookup-table__container">
        <table className="lookup-table__content">
          <thead className="lookup-table__head">
            <tr className="lookup-table__row">
              <th className="lookup-table__header" />
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="lookup-table__header"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="lookup-table__body">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={uuidv4()}
                  className="lookup-table__row"
                >
                  <td className="lookup-table__cell">
                    <input
                      type="radio"
                      checked={
                        selectedSupplier.name === (item as Supplier).name
                      }
                      onChange={handleSupplierRowClick(item)}
                    />
                  </td>
                  {tableHeaders.map((header) => (
                    <td
                      key={header}
                      className="lookup-table__cell"
                    >
                      {String(item[header as keyof Supplier])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length + 1}
                  className="lookup-table__cell"
                >
                  No Suppliers Available!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <div className="lookup-table__actions">
        <Button
          className="lookup-table__button lookup-table__button--select"
          type="button"
          onClick={handleSelectSupplier}
        >
          Select
        </Button>
        <Button
          className="lookup-table__button lookup-table__button--cancel"
          type="button"
          onClick={handleCancelSelectSupplier}
        >
          Cancel
        </Button>
      </div>
    </section>
  );
};

export default LookupTable;
