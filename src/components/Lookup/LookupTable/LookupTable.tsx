import { useCallback, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ChevronSVG } from '../../../assets/images/chevron.svg';
import { ReactComponent as CloseSVG } from '../../../assets/images/close.svg';
import { useI18n } from '../../../contexts/languageContext';
import { LookupContext } from '../../../contexts/LookupContext';
import { Supplier, User } from '../../../types/types';
import dataFiltering from '../../../utils/filterFunction';
import Button from '../../Form/Button';
import './LookupTable.css';
import SVGIcon from '../../SVGIcon/SVGIcon';

interface LookupTableProps<T> {
  data: T[];
  error?: string | null;
  loading?: boolean;
  headers?: string[];
}

const LookupTable = <T,>({
  data,
  error,
  loading,
  headers,
}: LookupTableProps<T>): JSX.Element => {
  const { translate } = useI18n();
  const {
    setSelectedSupplier,
    setSelectedUsers,
    selectedUsers,
    setShowLookup,
    showLookup,
    filterCriteria,
    lookupTitle,
    selectedSupplier,
  } = useContext(LookupContext)!;
  const [selectedRow, setSelectedRow] = useState<T | string>(selectedSupplier);
  const [selectedRows, setSelectedRows] = useState<T[]>(selectedUsers);

  const handleRowClick = useCallback(
    (item: T): void => {
      if (lookupTitle === 'Supplier') {
        const supplierName = (item as Supplier).name;
        setSelectedRow(supplierName);
      } else {
        setSelectedRows((prevSelectedRows) => {
          const isSelected = prevSelectedRows.some(
            (row) => (row as User).userId === (item as User).userId,
          );
          if (isSelected) {
            return prevSelectedRows.filter(
              (row) => (row as User).userId !== (item as User).userId,
            );
          }
          return [...prevSelectedRows, item];
        });
      }
    },
    [lookupTitle],
  );

  const handleSelectSupplier = useCallback(() => {
    if (lookupTitle === 'Supplier') {
      setSelectedSupplier(selectedRow);
    } else {
      setSelectedUsers(selectedRows);
    }

    setShowLookup(false);
  }, [
    setSelectedSupplier,
    setSelectedUsers,
    selectedRow,
    selectedRows,
    lookupTitle,
  ]);

  const handleCancelSelectSupplier = useCallback(() => {
    setShowLookup(false);
  }, [setShowLookup]);

  const filteredData = useMemo(() => {
    return showLookup
      ? data.filter((item) => dataFiltering(item, filterCriteria))
      : data;
  }, [filterCriteria, data]);

  const handleRemoveAssignedUser = useCallback(
    (item: T) => {
      const newSelectedUsers = selectedUsers.filter(
        (user) => (user as User).userId !== (item as User).userId,
      );
      setSelectedUsers(newSelectedUsers);
    },
    [selectedUsers, setSelectedUsers],
  );

  const tableHeaders = headers || Object.keys(filterCriteria);

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
          <p className="lookup__title">
            {translate(lookupTitle)} {translate('List')}
          </p>
        </div>
      ) : null}
      <section className="lookup-table__container">
        {loading && <p>{translate('Loading')}...</p>}
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
                  {showLookup && translate(lookupTitle)} {translate(header)}
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
                    {!showLookup && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAssignedUser(item)}
                      >
                        <SVGIcon
                          Icon={CloseSVG}
                          width={12}
                          height={10}
                          fill="#565757"
                        />
                      </button>
                    )}

                    {showLookup && lookupTitle === 'User' && (
                      <input
                        type="checkbox"
                        checked={selectedRows.some(
                          (row) =>
                            (row as User).userId === (item as User).userId,
                        )}
                        onChange={() => handleRowClick(item)}
                      />
                    )}
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
                  No{' '}
                  {showLookup
                    ? `${lookupTitle}s available!`
                    : 'Assigned users!'}
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
            {translate('Select')}
          </Button>
          <Button
            className="lookup-table__button lookup-table__button--cancel"
            type="button"
            onClick={handleCancelSelectSupplier}
          >
            {translate('Cancel')}
          </Button>
        </div>
      ) : null}
    </section>
  );
};

export default LookupTable;
