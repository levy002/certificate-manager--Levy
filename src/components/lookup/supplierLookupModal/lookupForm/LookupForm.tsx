import { useCallback, useState } from 'react';

import { ReactComponent as ChevronSVG } from '../../../../assets/images/chevron.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import { Supplier } from '../../../../types/Types';
import Button from '../../../form/Button';
import InputField from '../../../form/InputField';
import './LookupForm.css';
import SVGIcon from '../../../svgIcon/SVGIcon';

interface LookupModalFormProps {
  handleFilterCriteria: (criteria: Supplier | null) => void;
  initialFilterCriteria: Supplier | null;
}

const formFields = ['name', 'index', 'city'];

const LookupForm: React.FC<LookupModalFormProps> = ({
  initialFilterCriteria,
  handleFilterCriteria,
}): JSX.Element => {
  const [formState, setFormState] = useState<Supplier | null>(
    initialFilterCriteria,
  );
  const { translate } = useI18n();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { name, value } = event.target;
      setFormState(
        (prevState) =>
          ({
            ...prevState,
            [name]: value,
          }) as Supplier,
      );
    },
    [],
  );

  const handleReset = useCallback((): void => {
    setFormState(null);
    handleFilterCriteria(null);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      handleFilterCriteria(formState);
    },
    [formState],
  );

  return (
    <section className="lookup__form-container">
      <div className="lookup__header">
        <SVGIcon
          Icon={ChevronSVG}
          fill="#fff"
          width={12}
          height={10}
        />
        <p className="lookup__title">{translate('search_criteria')}</p>
      </div>

      <form
        className="lookup-form__form"
        onSubmit={handleSubmit}
      >
        <div className="lookup-form__fields">
          {formFields.map((key) => (
            <InputField
              key={key}
              type="text"
              label={translate(key)}
              name={key}
              value={formState ? formState[key as keyof Supplier] || '' : ''}
              placeholder=""
              error={false}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="lookup-form__buttons">
          <Button
            type="submit"
            className="lookup-form__button"
          >
            {translate('search')}
          </Button>
          <Button
            type="reset"
            onClick={handleReset}
            className="lookup-form__button lookup-form__button--reset"
          >
            {translate('reset')}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LookupForm;
