import { useCallback, useEffect, useRef, useState } from 'react';

import { ReactComponent as CloseSVG } from '../../../../assets/images/close.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import SVGIcon from '../../../svgIcon/SVGIcon';
import LookupForm from '../lookupForm/LookupForm';
import '../../supplierLookupModal/lookupModal/LookupModal.css';
import LookupTable from '../lookupTable/LookupTable';
import { UserDto } from '../../../../generated-sources/typesAndServices';
import apiClient from '../../../../api/clientApi';

interface UserLookupModalProps {
  onClose: () => void;
  handleAssigningUsers: (users: number[]) => void;
  preAssignedUsers: number[];
}

const UserLookupModal: React.FC<UserLookupModalProps> = ({
  onClose,
  handleAssigningUsers,
  preAssignedUsers,
}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [users, setUsers] = useState<UserDto[]>([]);
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

  const handleSelectedUsers = (selectedUsers: number[]): void => {
    const newUsers = selectedUsers.filter(
      (userId) => !preAssignedUsers.some((currentUserId) => currentUserId === userId ),
    );
    handleAssigningUsers([...preAssignedUsers, ...newUsers]);
    handleClose();
  };

  const handleFilterCriteria = useCallback(
    async (criteria: UserDto): Promise<void> => {
      if (criteria) {
        try {
          const allUsers = await apiClient.searchUsers(criteria);
          setUsers(allUsers.data.data);
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
