import { useCallback, useState } from 'react';

import { ReactComponent as ChevronSVG } from '../../../../assets/images/chevron.svg';
import { useI18n } from '../../../../contexts/LanguageContext';
import Button from '../../../form/Button';
import InputField from '../../../form/InputField';
import '../../supplierLookupModal/lookupForm/LookupForm.css';
import SVGIcon from '../../../svgIcon/SVGIcon';
import { UserDto } from '../../../../generated-sources/typesAndServices';

interface LookupModalFormProps {
  handleFilterCriteria: (criteria: UserDto) => void;
}

const formFields = {
  firstName: 'first_name',
  lastName: 'last_name',
  userId: 'user_id',
  departmentName: 'department',
  plant: 'plant',
  email: 'email',
};

const LookupForm: React.FC<LookupModalFormProps> = ({
  handleFilterCriteria,
}): JSX.Element => {
  const initialFilterCriteria = {
    id: 0,
    firstName: '',
    lastName: '',
    userId: '',
    departmentName: '',
    plant: '',
    email: '',
  };

  const [formState, setFormState] = useState<UserDto>(initialFilterCriteria);
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

  const handleReset = useCallback((): void => {
    setFormState(initialFilterCriteria);
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

      <form className="lookup-form__form" onSubmit={handleSubmit}>
        <div className="lookup-form__fields">
          {Object.keys(formFields).map((key) => (
            <InputField
              key={key}
              type="text"
              label={translate(formFields[key as keyof typeof formFields])}
              name={key}
              value={String(formState[key as keyof UserDto])}
              placeholder=""
              error={false}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="lookup-form__buttons">
          <Button type="submit" className="lookup-form__button">
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
