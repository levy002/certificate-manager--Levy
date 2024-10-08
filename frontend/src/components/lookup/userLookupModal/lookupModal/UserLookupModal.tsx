import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { ReactComponent as CloseSVG } from '../../../../assets/images/close.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import SVGIcon from '../../../svgIcon/SVGIcon';
import LookupForm from '../lookupForm/LookupForm';
import '../../supplierLookupModal/lookupModal/LookupModal.css';
import LookupTable from '../lookupTable/LookupTable';
import { UserDto } from '../../../../generated-sources/typesAndServices';
import apiClient from '../../../../api/clientApi';
import {UserContext} from '../../../..///contexts/UserContext';

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
  const [allUsers, setAllUsers] = useState<UserDto[]>([]);
  const { translate } = useI18n();
  const { users } = useContext(UserContext)!;

  useEffect(() => {
    dialogRef.current?.showModal();
    return (): void => {
      dialogRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (preAssignedUsers.length > 0) {
      const assignedUsers = users.filter(user => preAssignedUsers.includes(user.id));
      setAllUsers(assignedUsers);
    }
  }, [preAssignedUsers, users]);

  const handleClose = (): void => {
    dialogRef.current?.close();
    onClose();
  };

  const handleSelectedUsers = (selectedUsers: number[]): void => {
    handleAssigningUsers(selectedUsers);
    handleClose();
  };

  const handleFilterCriteria = useCallback(
    async (criteria: UserDto): Promise<void> => {
      if (criteria) {
        try {
          const allUsers = await apiClient.searchUsers(criteria);
          setAllUsers(allUsers.data.data);
        } catch (error) {
          setAllUsers([]);
        }
      } else {
        setAllUsers([]);
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
          <div className='close-icon'>
            <SVGIcon
              Icon={CloseSVG}
              fill="#565757"
              onClick={handleClose}
            />
          </div>
        </div>
        <LookupForm handleFilterCriteria={handleFilterCriteria} />
        <LookupTable
          handleSelectedUser={handleSelectedUsers}
          data={allUsers}
          closeModal={onClose}
          preAssignedUsers={preAssignedUsers}
        />
      </section>
    </dialog>
  );
};

export default UserLookupModal;
