import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { ReactComponent as SearchSVG } from '../../assets/images/search.svg';
import { useI18n } from '../../contexts/LanguageContext';
import { addNewCertificate, updateCertificate } from '../../data/DB';
import {
  Certificate,
  CertificateType,
  FormMode,
  Supplier,
} from '../../types/Types';
import formatValue from '../../utils/FormatInputValue';
import InputField from '../form/InputField';
import SelectField from '../form/SelectFIeld';
import LookupModal from '../lookup/supplierLookupModal/SupplierLookupModal';
import SVGIcon from '../svgIcon/SVGIcon';

import './CertificateForm.css';

interface CertificateFormProps {
  initialFormState: Certificate;
  mode: FormMode;
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  initialFormState,
  mode,
}) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<Certificate>(initialFormState);
  const [formError, setFormError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const { translate } = useI18n();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { name, value, type } = event.target;

      setFormState((prevState) => ({
        ...prevState,
        [name]: type === 'date' ? new Date(value) : value,
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
              PDFUrl: reader.result as string,
            }));
          }
        };
        reader.readAsDataURL(file);
      } else {
        setFormError('Please upload a valid PDF file.');
      }
    },
    [],
  );

  const handleReset = (): void => {
    setFormState(initialFormState);
    setFormError('');
  };

  const handleClearSupplier = useCallback(() => {
    setFormState((prevState) => ({
      ...prevState,
      supplier: null,
    }));
  }, []);

  const handleAddNewCertificate = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const newCertificateData = {
      ...formState,
    };

    try {
      if (mode === FormMode.EDIT) {
        await updateCertificate(newCertificateData);
      } else {
        await addNewCertificate(newCertificateData);
      }
      handleReset();
      navigate('/machineLearning/example1');
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong, try again',
      );
    }
  };

  const handleOpenLookupModal = (): void => {
    setShowModal(true);
  };

  const handleSupplierSelection = (supplier: Supplier | null): void => {
    setFormState((prevState) => ({
      ...prevState,
      supplier,
    }));
    setShowModal(false);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

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
                label="Supplier"
                name="supplier"
                value={formState?.supplier?.name || ''}
                placeholder=""
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
                  onClick={handleOpenLookupModal}
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
              label="Certificate Type"
              name="certificateType"
              value={formState.certificateType}
              placeholder="Select your option"
              options={Object.values(CertificateType)}
              error={!!formError}
              onChange={handleChange}
            />

            <InputField
              type="date"
              label="Valid from"
              name="validFrom"
              value={formState.validFrom}
              placeholder="Click to select date"
              error={!!formError}
              onChange={handleChange}
            />

            <InputField
              type="date"
              label="Valid to"
              name="validTo"
              value={formState.validTo}
              placeholder="Click to select date"
              error={!!formError}
              onChange={handleChange}
              min={
                formState.validFrom instanceof Date
                  ? formatValue('date', formState.validFrom)
                  : undefined
              }
              required
            />
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
                {formState.PDFUrl && (
                  <embed
                    src={formState.PDFUrl}
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
      {showModal && (
        <LookupModal
          onClose={handleCloseModal}
          handleSelectedSupplier={handleSupplierSelection}
          preSelectedSupplier={formState.supplier || null}
        />
      )}
    </div>
  );
};

export default CertificateForm;
