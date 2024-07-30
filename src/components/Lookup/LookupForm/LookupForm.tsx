import { useCallback, useContext, useState, useEffect } from 'react';

import { ReactComponent as ChevronSVG } from '../../../assets/images/chevron.svg';
import { useI18n } from '../../../contexts/languageContext';
import { LookupContext } from '../../../contexts/LookupContext';
import { Department } from '../../../types/types';
import Button from '../../Form/Button';
import InputField from '../../Form/InputField';
import './LookupForm.css';
import SelectField from '../../Form/SelectFIeld';
import SVGIcon from '../../SVGIcon/SVGIcon';

const LookupForm: React.FC = (): JSX.Element => {
  const { translate } = useI18n();
  const { setFilterCriteria, filterCriteria, lookupTitle } =
    useContext(LookupContext)!;
  const [formState, setFormState] = useState(filterCriteria);

  useEffect(() => {
    setFormState(filterCriteria);
  }, [filterCriteria]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { name, value } = event.target;
      setFormState((prevState: object) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  const handleReset = useCallback((): void => {
    const emptyState =
      lookupTitle === 'Supplier'
        ? { name: '', index: '', city: '' }
        : {
            name: '',
            firstName: '',
            userId: '',
            department: Department.ITM,
            plant: '',
          };
    setFormState(emptyState);
    setFilterCriteria(emptyState);
  }, [setFilterCriteria, formState]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      setFilterCriteria(formState);
    },
    [formState, setFilterCriteria],
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
        <p className="lookup__title">{translate('Search criteria')}</p>
      </div>

      <form
        className="lookup-form__form"
        onSubmit={handleSubmit}
      >
        <div className="lookup-form__fields">
          {Object.keys(formState).map((key) =>
            key === 'department' ? (
              <SelectField
                key={key}
                label={key}
                name={key}
                placeholder=""
                value={formState[key]}
                options={Object.values(Department)}
                error={false}
                onChange={handleChange}
              />
            ) : (
              <InputField
                key={key}
                type="text"
                label={key}
                name={key}
                value={formState[key]}
                placeholder=""
                error={false}
                onChange={handleChange}
              />
            ),
          )}
        </div>
        <div className="lookup-form__buttons">
          <Button
            type="submit"
            className="lookup-form__button"
          >
            {translate('Search')}
          </Button>
          <Button
            type="reset"
            onClick={handleReset}
            className="lookup-form__button lookup-form__button--reset"
          >
            {translate('Reset')}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LookupForm;
