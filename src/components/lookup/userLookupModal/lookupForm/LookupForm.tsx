import { useCallback, useState } from 'react';

import { ReactComponent as ChevronSVG } from '../../../../assets/images/chevron.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import { Department, User } from '../../../../types/Types';
import Button from '../../../form/Button';
import InputField from '../../../form/InputField';
import '../../supplierLookupModal/lookupForm/LookupForm.css';
import SVGIcon from '../../../svgIcon/SVGIcon';

interface LookupModalFormProps {
  handleFilterCriteria: (criteria: User) => void;
}

const LookupForm: React.FC<LookupModalFormProps> = ({
  handleFilterCriteria,
}): JSX.Element => {
  const initialFilterCriteria: User = {
    name: '',
    firstName: '',
    userId: '',
    department: Department.ITM,
    plant: '',
    email: '',
  };

  const [formState, setFormState] = useState<User>(initialFilterCriteria);
  const { translate } = useI18n();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { name, value } = event.target;
      setFormState(
        (prevState) =>
          ({
            ...prevState,
            [name]: value,
          }) as User,
      );
    },
    [],
  );

  const handleReset = useCallback((): void => {
    setFormState(initialFilterCriteria);
    handleFilterCriteria(initialFilterCriteria);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      handleFilterCriteria(formState);
    },
    [formState],
  );

  const formFields = [
    'name',
    'firstName',
    'userId',
    'department',
    'plant',
    'email',
  ];

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
              value={formState ? formState[key as keyof User] || '' : ''}
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
