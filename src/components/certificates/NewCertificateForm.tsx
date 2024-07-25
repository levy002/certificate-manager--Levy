import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { ReactComponent as SearchSVG } from '../../assets/images/search.svg';
import { addNewCertificate } from '../../data/db';
import { Certificate, CertificateType } from '../../types/types';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectFIeld';
import SVGIcon from '../SVGIcon/SVGIcon';

import './certificateForm.css';

const NewCertificateForm: React.FC = () => {
  const navigate = useNavigate();

  const initialFormState: Certificate = {
    supplier: '',
    certificateType: CertificateType.OHSAS18001,
    validFrom: null,
    validTo: null,
    PDFUrl: '',
    id: Date.now(),
  };

  const [formState, setFormState] = useState<Certificate>(initialFormState);
  const [formError, setFormError] = useState<string>('');

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

  const handleAddNewCertificate = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const newCertificateData = {
      ...formState,
    };

    try {
      await addNewCertificate(newCertificateData);
      handleReset();
      navigate('/machineLearning/example1');
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong, try again',
      );
    }
  };

  return (
    <div className="form-container">
      <h2>New Certificate</h2>
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
                value={formState.supplier}
                placeholder=""
                error={!!formError}
                onChange={handleChange}
              />
              <div className="form-container__icons">
                <SVGIcon
                  Icon={SearchSVG}
                  fill="#565757"
                  width={16}
                />
                <SVGIcon
                  Icon={CloseSVG}
                  fill="#565757"
                  width={16}
                />
              </div>
            </div>

            <SelectField
              label="Certificate type"
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
                  ? formState.validFrom.toISOString().split('T')[0]
                  : undefined
              }
            />
          </div>

          <div className="form-container__pdf">
            <div className="form-container__pdf-upload">
              <label htmlFor="PDF file">
                Upload
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
            Submit
          </button>

          <button
            className="form-container__buttons-reset-btn"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
      {formError && <p>{formError}</p>}
    </div>
  );
};

export default NewCertificateForm;
