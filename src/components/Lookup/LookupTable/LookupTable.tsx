import { useCallback, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ChevronSVG } from '../../../assets/images/chevron.svg';
import { useI18n } from '../../../contexts/languageContext';
import { LookupContext } from '../../../contexts/LookupContext';
import dataFiltering from '../../../utils/filterFunction';
import Button from '../../Form/Button';
import './LookupTable.css';
import SVGIcon from '../../SVGIcon/SVGIcon';

interface LookupTableProps<T> {
  data: T[];
  error: string | null;
  loading: boolean;
  title: string;
}

const LookupTable = <T,>({
  data,
  error,
  loading,
  title,
}: LookupTableProps<T>): JSX.Element => {
  const { translate } = useI18n();
  const { setSelectedItem, setShowLookup, filterCriteria } =
    useContext(LookupContext)!;
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleRowClick = (item: T): void => {
    setSelectedRow(item);
  };

  const handleSelectSupplier = useCallback(() => {
    setSelectedItem(selectedRow);
    setShowLookup(false);
  }, [setSelectedItem, selectedRow]);

  const handleCancelSelectSupplier = useCallback(() => {
    setShowLookup(false);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => dataFiltering(item, filterCriteria));
  }, [filterCriteria, data]);

  const tableHeaders = Object.keys(filterCriteria);

  return (
    <section className="lookup-table">
      <div className="lookup__header">
        <SVGIcon
          Icon={ChevronSVG}
          fill="#fff"
          width={12}
          height={10}
        />
        <p className="lookup__title">
          {translate(title)} {translate('List')}
        </p>
      </div>
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
                  {translate(title)} {translate(header)}
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
                      onClick={() => handleRowClick(item)}
                    />
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
                  No {title}s Available!!
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
    </section>
  );
};

export default LookupTable;
