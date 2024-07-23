import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as CloseSVG } from '../../assets/images/close.svg';
import { ReactComponent as SearchSVG } from '../../assets/images/search.svg';
import { CertificatesContext } from '../../contexts/certificatesContext';
import { addNewCertificate, updateCertificate } from '../../data/db';
import { Certificate, CertificateType } from '../../types/types';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectFIeld';
import SVGIcon from '../SVGIcon/SVGIcon';
import './certificateForm.css';

interface NewCertificateFormProps {
  certificate?: Certificate;
}

const CertificateForm: React.FC<NewCertificateFormProps> = ({
  certificate,
}) => {
  const navigate = useNavigate();

  const initialFormState = {
    supplier: '',
    certificateType: CertificateType.OHSAS18001,
    validFrom: '',
    validTo: '',
    PDFUrl: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState<string>('');
  const [PDFUrl, setPDFUrl] = useState<string | null>(null);
  const { refetch } = useContext(CertificatesContext)!;

  useEffect(() => {
    if (certificate) {
      setFormState({
        supplier: certificate.supplier,
        certificateType: certificate.certificateType,
        validFrom: certificate.validFrom.toISOString().split('T')[0],
        validTo: certificate.validTo.toISOString().split('T')[0],
        PDFUrl: certificate.PDFUrl || '',
      });
      setPDFUrl(certificate.PDFUrl || null);
    }
  }, [certificate]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePDFUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (): void => {
        if (reader.result) {
          setPDFUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFormError('Please upload a valid PDF file.');
    }
  };

  const handleReset = (): void => {
    setFormState(initialFormState);
    setPDFUrl(null);
    setFormError('');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const newCertificateData = {
      ...formState,
      validFrom: new Date(formState.validFrom),
      validTo: new Date(formState.validTo),
      PDFUrl,
      id: certificate ? certificate.id : Date.now(),
    };

    try {
      if (certificate) {
        await updateCertificate(newCertificateData);
      } else {
        await addNewCertificate(newCertificateData);
      }
      handleReset();
      refetch();
      navigate('/machineLearning/example1');
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : 'Something went wrong, try again',
      );
    }
  };

  return (
    <div className="form-container">
      <h2>{certificate ? 'Edit Certificate' : 'New Certificate'}</h2>
      <form
        onSubmit={handleSubmit}
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
              options={Object.values(CertificateType).map((value) => ({
                value,
              }))}
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
              min={formState.validFrom}
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
                {PDFUrl && (
                  <embed
                    src={PDFUrl}
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
            {certificate ? 'Update' : 'Save'}
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

export default CertificateForm;
