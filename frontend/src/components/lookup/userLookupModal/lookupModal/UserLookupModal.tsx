import { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as CloseSVG } from '../../../../assets/images/close.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import { searchUser } from '../../../../data/DB';
import { User } from '../../../../types/Types';
import SVGIcon from '../../../svgIcon/SVGIcon';
import LookupForm from '../lookupForm/LookupForm';
import '../../supplierLookupModal/lookupModal/LookupModal.css';
import LookupTable from '../lookupTable/LookupTable';

interface UserLookupModalProps {
  onClose: () => void;
  handleAssigningUsers: (users: User[]) => void;
  preAssignedUsers: User[];
}

const UserLookupModal: React.FC<UserLookupModalProps> = ({
  onClose,
  handleAssigningUsers,
  preAssignedUsers,
}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [users, setUsers] = useState<User[]>([]);
  const { translate } = useI18n();

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

  const handleSelectedUsers = (selectedUsers: User[]): void => {
    const newUsers = selectedUsers.filter(
      (user) => !preAssignedUsers.some((u) => u.userId === user.userId),
    );
    handleAssigningUsers([...preAssignedUsers, ...newUsers]);
    handleClose();
  };

  const handleFilterCriteria = useCallback(
    async (criteria: User): Promise<void> => {
      if (criteria) {
        try {
          const allUsers = await searchUser(...Object.values(criteria));
          if (allUsers && allUsers.length > 0) {
            setUsers(allUsers);
          } else {
            setUsers([]);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    },
    [],
  );

  return (
    <dialog
      ref={dialogRef}
      className="lookup-wrapper"
    >
      <section className="lookup-container">
        <div className="lookup-container__header">
          <h3 className="lookup-container__title">
            {translate('search_for_user')}
          </h3>
          <SVGIcon
            Icon={CloseSVG}
            fill="#565757"
            onClick={handleClose}
          />
        </div>
        <LookupForm handleFilterCriteria={handleFilterCriteria} />
        <LookupTable
          handleSelectedUser={handleSelectedUsers}
          data={users}
          closeModal={onClose}
        />
      </section>
    </dialog>
  );
};

export default UserLookupModal;
