import { useCallback, useContext } from 'react';
import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { useI18n } from '../../contexts/LanguageContext';
import '../lookup/supplierLookupModal/lookupTable/LookupTable.css';
import SVGIcon from '../svgIcon/SVGIcon';
import { UserContext } from '../../contexts/UserContext';
import { UserDto } from '../../generated-sources/typesAndServices';

interface CertificateAssignedUsersTableProps {
  assignedUsers: number[];
  unAssignUser: (userId: number) => void;
}

const tableHeaders: (keyof UserDto)[] = ['firstName', 'departmentName', 'email'];

const getDisplayLabel = (field: keyof UserDto, translate: (key: string) => string): string => {
  if (field === 'departmentName') return translate('department');
  if (field === 'firstName') return translate('name');
  return translate(field);
};

const CertificateAssignedUsersTable: React.FC<CertificateAssignedUsersTableProps> = ({
  assignedUsers,
  unAssignUser,
}): JSX.Element => {
  const { translate } = useI18n();
  const { users } = useContext(UserContext)!;

  const handleUnAssignUser = useCallback(
    (userId: number) => () => {
      unAssignUser(userId);
    },
    [unAssignUser],
  );

  return (
    <section className="lookup-table__container">
      <table className="lookup-table__content">
        <thead className="lookup-table__head">
          <tr className="lookup-table__row">
            <th className="lookup-table__header" />
            {tableHeaders.map((header) => (
              <th key={header} className="lookup-table__header">
                {getDisplayLabel(header, translate)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="lookup-table__body">
          {users.length > 0 ? (
            assignedUsers.map((userId) => {
              const user = users.find((user) => user.id === userId);
              return user ? (
                <tr key={userId} className="lookup-table__row">
                  <td className="lookup-table__cell">
                    <SVGIcon
                      Icon={CloseSVG}
                      fill="#000"
                      width={14}
                      height={12}
                      onClick={handleUnAssignUser(userId)}
                    />
                  </td>
                  {tableHeaders.map((header) => (
                    <td key={header} className="lookup-table__cell">
                      {user[header]}
                    </td>
                  ))}
                </tr>
              ) : null;
            })
          ) : (
            <tr>
              <td colSpan={tableHeaders.length + 1} className="lookup-table__cell">
                {translate('no_participants')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CertificateAssignedUsersTable;
