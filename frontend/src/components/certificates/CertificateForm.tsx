import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CertificateAssignedUsersTable from './CertificateAssignedUsersTable';
import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { ReactComponent as SearchSVG } from '../../assets/images/search.svg';
import { useI18n } from '../../contexts/LanguageContext';
import formatValue from '../../utils/FormatInputValue';
import Button from '../form/Button';
import InputField from '../form/InputField';
import SelectField from '../form/SelectFIeld';
import LookupModal from '../lookup/supplierLookupModal/lookupModal/SupplierLookupModal';
import UserLookupModal from '../lookup/userLookupModal/lookupModal/UserLookupModal';
import SVGIcon from '../svgIcon/SVGIcon';
import './CertificateForm.css';
import CertificateComments from './CertificateComments';
import { CertificateDto, CommentDto, SupplierDto, CertificateType } from '../../generated-sources/typesAndServices';
import { FormMode } from '../../types/Types';
import apiClient from '../../api/clientApi';

interface CertificateFormProps {
  initialFormState: CertificateDto;
  mode: FormMode;
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  initialFormState,
  mode,
}) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<CertificateDto>(initialFormState);
  const [formError, setFormError] = useState<string>('');
  const [showSupplierModal, setShowSupplierModal] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const { translate } = useI18n();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { name, value } = event.target;

      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  const handlePDFUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (): void => {
          if (reader.result) {
            setFormState((prevState) => ({
              ...prevState,
              pdfFile: reader.result as string,
            }));
          }
        };
        reader.readAsDataURL(file);
      } else {
        setFormError(translate('please_upload_pdf'));
      }
    },
    [translate],
  );

  const handleReset = (): void => {
    setFormState(initialFormState);
  };

  const handleClearSupplier = useCallback(() => {
    setFormState((prevState) => ({
      ...prevState,
      supplier: {name: "", city: "", id: 0},
    }));
  }, []);

  const handleAddNewCertificate = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      if (mode === FormMode.EDIT) {
        await apiClient.updateCertificate(formState.id, formState);
      } else {
        await apiClient.createCertificate(formState);
      }
      handleReset();
      navigate('/machineLearning/certificates');
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : translate('something_went_wrong'),
      );
    }
  };

  const handleOpenSupplierLookupModal = (): void => {
    setShowSupplierModal(true);
  };

  const handleOpenUserLookupModal = (): void => {
    setShowUserModal(true);
  };

  const handleSupplierSelection = (supplier: SupplierDto | null): void => {
    setFormState((prevState) => ({
      ...prevState,
      supplier: supplier ? supplier : prevState.supplier,
    }));
    setShowSupplierModal(false);
  };

  const handleAssigningUsers = (users: number[]): void => {
    setFormState((prevState) => ({
      ...prevState,
      assignedUsers: users,
    }));
    setShowUserModal(false);
  };

  const handleUnAssignUser = (userId: number): void => {
    setFormState((prevState) => ({
      ...prevState,
      assignedUsers: prevState.assignedUsers.filter(
        (currentUserId) => currentUserId !== userId,
      ),
    }));
  };

  const handleCloseSupplierModal = useCallback(() => {
    setShowSupplierModal(false);
  }, []);

  const handleCloseUserModal = useCallback(() => {
    setShowUserModal(false);
  }, []);

   const handleAddComment = (newComment: CommentDto): void => {
    setFormState((prevState) => ({
      ...prevState,
      comments: [...prevState.comments, newComment]
    }));
   };
  

  return (
    <div className="form-container">
      <h2>
        {mode === FormMode.EDIT
          ? translate('edit_certificate')
          : translate('new_certificate')}
      </h2>
      <form
        onSubmit={handleAddNewCertificate}
        className="form-container__form"
      >
        <div className="form-container__form__all-inputs">
          <div className="form-container__input-group">
            <div className="form-container__supplier-input">
              <InputField
                type="text"
                label={translate('supplier')}
                name="supplier"
                value={formState?.supplier?.name || ''}
                placeholder={translate('search_for_supplier')}
                error={!!formError}
                onChange={handleChange}
                required
                readonly
              />
              <div className="form-container__icons">
                <SVGIcon
                  Icon={SearchSVG}
                  fill="#565757"
                  width={16}
                  onClick={handleOpenSupplierLookupModal}
                />
                <SVGIcon
                  Icon={CloseSVG}
                  fill="#565757"
                  width={16}
                  onClick={handleClearSupplier}
                />
              </div>
            </div>

            <SelectField
              label={translate('certificate_type')}
              name="certificateType"
              value={formState.certificateType}
              placeholder={translate('select')}
              options={Object.values(CertificateType).map((type) => ({label: type, value: type}))}
              error={!!formError}
              onChange={handleChange}
            />

            <InputField
              type="date"
              label={translate('valid_from')}
              name="validFrom"
              value={formState.validFrom}
              placeholder={translate('click_to_select_date')}
              error={!!formError}
              onChange={handleChange}
            />

            <InputField
              type="date"
              label={translate('valid_to')}
              name="validTo"
              value={formState.validTo}
              placeholder={translate('click_to_select_date')}
              error={!!formError}
              onChange={handleChange}
              min={
                formState.validFrom instanceof Date
                  ? formatValue('date', formState.validFrom)
                  : undefined
              }
              required
            />

            <CertificateComments
          comments={formState.comments}
          addComment={handleAddComment}
        />
            
            <section className="assigned-users">
              <label
                htmlFor="users"
                className="input-field__label"
              >
                {translate('assigned_users')}
              </label>

              <Button
                onClick={handleOpenUserLookupModal}
                type="button"
                className="assigned-users__button"
              >
                <>
                  <SVGIcon
                    Icon={SearchSVG}
                    fill="#565757"
                    height={16}
                  />
                  {translate('add_participant')}
                </>
              </Button>

              <CertificateAssignedUsersTable
                assignedUsers={formState.assignedUsers}
                unAssignUser={handleUnAssignUser}
              />
            </section>
          </div>

          <div className="form-container__pdf">
            <div className="form-container__pdf-upload">
              <label htmlFor="PDF file">
                {translate('upload')}
                <input
                  type="file"
                  accept="application/pdf"
                  id="PDF file"
                  onChange={handlePDFUrlChange}
                />
              </label>
              <div className="form-container__pdf-preview">
                {formState.pdfFile && (
                  <embed
                    src={formState.pdfFile}
                    type="application/pdf"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-container__buttons">
          <button
            className="form-container__buttons-submit-btn"
            type="submit"
          >
            {mode === FormMode.EDIT ? translate('update') : translate('save')}
          </button>

          <button
            className="form-container__buttons-reset-btn"
            type="button"
            onClick={handleReset}
          >
            {translate('reset')}
          </button>
        </div>
      </form>
      {formError && <p>{formError}</p>}
      {showSupplierModal && (
        <LookupModal
          onClose={handleCloseSupplierModal}
          handleSelectedSupplier={handleSupplierSelection}
          preSelectedSupplier={formState.supplier || null}
        />
      )}

      {showUserModal && (
        <UserLookupModal
          onClose={handleCloseUserModal}
          handleAssigningUsers={handleAssigningUsers}
          preAssignedUsers={formState.assignedUsers}
        />
      )}
    </div>
  );
};

export default CertificateForm;
