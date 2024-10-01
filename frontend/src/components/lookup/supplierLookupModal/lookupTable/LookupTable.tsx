import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ChevronSVG } from '../../../../assets/images/chevron.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import Button from '../../../form/Button';
import './LookupTable.css';
import SVGIcon from '../../../svgIcon/SVGIcon';
import { SupplierDto } from '../../../../generated-sources/typesAndServices';

interface LookupTableProps {
  data: SupplierDto[];
  handleSelectedSupplier: (supplier: SupplierDto | null) => void;
  closeModal: () => void;
}

const tableHeaders = ['name', 'id', 'city'];

const LookupTable: React.FC<LookupTableProps> = ({
  handleSelectedSupplier,
  data,
  closeModal,
}): JSX.Element => {
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierDto | null>(
    null,
  );
  const { translate } = useI18n();

  const handleSupplierRowClick = useCallback(
    (supplier: SupplierDto): React.ChangeEventHandler<HTMLInputElement> => {
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

  return (
    <section className="lookup-table">
      <div className="lookup__header">
        <SVGIcon
          Icon={ChevronSVG}
          fill="#fff"
          width={12}
          height={10}
        />
        <p className="lookup__title">{translate('suppliers_list')}</p>
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
                  {header === "id" ? translate("index") :  translate(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="lookup-table__body">
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={uuidv4()}
                  className="lookup-table__row"
                >
                  <td className="lookup-table__cell">
                    <input
                      type="radio"
                      checked={
                        selectedSupplier?.id === (item as SupplierDto).id
                      }
                      onChange={handleSupplierRowClick(item)}
                    />
                  </td>
                  {tableHeaders.map((header) => (
                    <td
                      key={header}
                      className="lookup-table__cell"
                    >
                      {translate(String(item[header as keyof SupplierDto]))}
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
                  {translate('no_suppliers_available')}
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
          {translate('select')}
        </Button>
        <Button
          className="lookup-table__button lookup-table__button--cancel"
          type="button"
          onClick={handleCancelSelectSupplier}
        >
          {translate('cancel')}
        </Button>
      </div>
    </section>
  );
};

export default LookupTable;
