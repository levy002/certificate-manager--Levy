import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ChevronSVG } from '../../../../assets/images/chevron.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import Button from '../../../form/Button';
import '../../supplierLookupModal/lookupTable/LookupTable.css';
import SVGIcon from '../../../svgIcon/SVGIcon';
import { UserDto } from '../../../../generated-sources/typesAndServices';

interface LookupTableProps {
  data: UserDto[];
  handleSelectedUser: (userIds: number[]) => void;
  closeModal: () => void;
  preAssignedUsers: number[];
}

const tableHeaders = {
  firstName: 'first_name',
  lastName: 'last_name',
  userId: 'user_id',
  departmentName: 'department',
  plant: 'plant',
  email: 'email',
};

const LookupTable: React.FC<LookupTableProps> = ({
  handleSelectedUser,
  data,
  closeModal,
  preAssignedUsers,
}): JSX.Element => {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const { translate } = useI18n();

  const handleSupplierRowClick = useCallback((userId: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>): void => {
      const isChecked = event.target.checked;

      setSelectedUserIds((prevSelected) =>
        isChecked
          ? [...prevSelected, userId]
          : prevSelected.filter((id) => id !== userId)
      );
    };
  }, []);

  useEffect(() => {
    if (preAssignedUsers.length > 0) {
      setSelectedUserIds(preAssignedUsers);
    }
  }, [preAssignedUsers]);

  const handleSelectUsers = useCallback(() => {
    handleSelectedUser(selectedUserIds);
    closeModal();
  }, [selectedUserIds, handleSelectedUser, closeModal]);

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
              {Object.keys(tableHeaders).map((header) => (
                <th key={header} className="lookup-table__header">
                  {translate(tableHeaders[header as keyof Omit<UserDto, 'id'>])}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="lookup-table__body">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={uuidv4()} className="lookup-table__row">
                  <td className="lookup-table__cell">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(item.id)}
                      onChange={handleSupplierRowClick(item.id)}
                    />
                  </td>
                  {Object.keys(tableHeaders).map((header) => (
                    <td key={header} className="lookup-table__cell">
                      {/* Accessing the correct translation based on the header */}
                      {translate(String(item[header as keyof UserDto]))}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Object.values(tableHeaders).length + 1}
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
