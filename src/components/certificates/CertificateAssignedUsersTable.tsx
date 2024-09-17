import { useCallback } from 'react';

import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { useI18n } from '../../contexts/LanguageContext';
import { User } from '../../types/Types';
import '../lookup/supplierLookupModal/lookupTable/LookupTable.css';
import SVGIcon from '../svgIcon/SVGIcon';

interface CertificateAssignedUsersTableProps {
  users: User[];
  unAssignUser: (userId: string) => void;
}

const tableHeaders = ['name', 'department', 'email'];

const CertificateAssignedUsersTable: React.FC<
  CertificateAssignedUsersTableProps
> = ({ users, unAssignUser }): JSX.Element => {
  const { translate } = useI18n();

  const handleUnAssignUser = useCallback(
    (userId: string) => () => {
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
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.userId}
                className="lookup-table__row"
              >
                <td className="lookup-table__cell">
                  <SVGIcon
                    Icon={CloseSVG}
                    fill="#000"
                    width={14}
                    height={12}
                    onClick={handleUnAssignUser(user.userId)}
                  />
                </td>
                {tableHeaders.map((header) => (
                  <td
                    key={header}
                    className="lookup-table__cell"
                  >
                    {translate(String(user[header as keyof User]))}
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
