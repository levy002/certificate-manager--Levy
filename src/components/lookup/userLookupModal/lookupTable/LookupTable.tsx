import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ChevronSVG } from '../../../../assets/images/chevron.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import { User } from '../../../../types/Types';
import Button from '../../../form/Button';
import '../../supplierLookupModal/lookupTable/LookupTable.css';
import SVGIcon from '../../../svgIcon/SVGIcon';

interface LookupTableProps {
  data: User[];
  handleSelectedUser: (users: User[]) => void;
  closeModal: () => void;
}

const tableHeaders = [
  'name',
  'firstName',
  'userId',
  'department',
  'plant',
  'email',
];

const LookupTable: React.FC<LookupTableProps> = ({
  handleSelectedUser,
  data,
  closeModal,
}): JSX.Element => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { translate } = useI18n();

  const handleSupplierRowClick = useCallback((user: User) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      const isChecked = event.target.checked;

      setSelectedUsers((prevSelected) =>
        isChecked
          ? [...prevSelected, user]
          : prevSelected.filter((selected) => selected.userId !== user.userId),
      );
    };
  }, []);

  const handleSelectUsers = useCallback(() => {
    handleSelectedUser(selectedUsers);
    closeModal();
  }, [selectedUsers, handleSelectedUser, closeModal]);

  const handleCancel = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <section className="lookup-table">
      <div className="lookup__header">
        <SVGIcon
          Icon={ChevronSVG}
          fill="#fff"
          width={12}
          height={10}
        />
        <p className="lookup__title">{translate('users_list')}</p>
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
                  {translate(header)}
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
                      type="checkbox"
                      checked={selectedUsers.some(
                        (user) => user.userId === item.userId,
                      )}
                      onChange={handleSupplierRowClick(item)}
                    />
                  </td>
                  {tableHeaders.map((header) => (
                    <td
                      key={header}
                      className="lookup-table__cell"
                    >
                      {translate(String(item[header as keyof User]))}
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
                  {translate('no_users_available')}
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
          onClick={handleSelectUsers}
        >
          {translate('select')}
        </Button>
        <Button
          className="lookup-table__button lookup-table__button--cancel"
          type="button"
          onClick={handleCancel}
        >
          {translate('cancel')}
        </Button>
      </div>
    </section>
  );
};

export default LookupTable;
