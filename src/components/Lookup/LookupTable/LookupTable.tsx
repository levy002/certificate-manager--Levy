import { useCallback, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ChevronSVG } from '../../../assets/images/chevron.svg';
import { LookupContext } from '../../../contexts/LookupContext';
import { Supplier } from '../../../types/types';
import dataFiltering from '../../../utils/filterFunction';
import Button from '../../Form/Button';
import './LookupTable.css';
import SVGIcon from '../../SVGIcon/SVGIcon';

interface LookupTableProps<T> {
  data: T[];
  error?: string | null;
  loading?: boolean;
}

const LookupTable = <T,>({
  data,
  error,
  loading,
}: LookupTableProps<T>): JSX.Element => {
  const {
    setSelectedSupplier,
    setShowLookup,
    showLookup,
    filterCriteria,
    lookupTitle,
    selectedSupplier,
  } = useContext(LookupContext)!;
  const [selectedRow, setSelectedRow] = useState<T | string>(selectedSupplier);

  const handleRowClick = useCallback(
    (item: T): void => {
      if (lookupTitle === 'Supplier') {
        const supplierName = (item as Supplier).name;
        setSelectedRow(supplierName);
      }
    },
    [lookupTitle],
  );

  const handleSelectSupplier = useCallback(() => {
    if (lookupTitle === 'Supplier') {
      setSelectedSupplier(selectedRow);
    }
    setShowLookup(false);
  }, [setSelectedSupplier, selectedRow, lookupTitle]);

  const handleCancelSelectSupplier = useCallback(() => {
    setShowLookup(false);
  }, [setShowLookup]);

  const filteredData = useMemo(() => {
    return data.filter((item) => dataFiltering(item, filterCriteria));
  }, [filterCriteria, data]);

  const tableHeaders = Object.keys(filterCriteria);

  return (
    <section className="lookup-table">
      {showLookup ? (
        <div className="lookup__header">
          <SVGIcon
            Icon={ChevronSVG}
            fill="#fff"
            width={12}
            height={10}
          />
          <p className="lookup__title">{lookupTitle} List</p>
        </div>
      ) : null}
      <section className="lookup-table__container">
        {loading && <p>Loading...</p>}
        {error && !loading && <p>Error: {error}</p>}

        <table className="lookup-table__content">
          <thead className="lookup-table__head">
            <tr className="lookup-table__row">
              <th className="lookup-table__header" />
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="lookup-table__header"
                >
                  {lookupTitle} {header}
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
                    {showLookup && lookupTitle === 'Supplier' && (
                      <input
                        type="radio"
                        checked={selectedRow === (item as Supplier).name}
                        onChange={() => handleRowClick(item)}
                      />
                    )}
                  </td>
                  {tableHeaders.map((header) => (
                    <td
                      key={header}
                      className="lookup-table__cell"
                    >
                      {String((item as Record<string, string>)[header])}
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
                  No {lookupTitle}s Available!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      {showLookup ? (
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
      ) : null}
    </section>
  );
};

export default LookupTable;
