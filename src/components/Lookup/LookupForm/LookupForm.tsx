import { useCallback, useContext, useState, useEffect } from 'react';

import { ReactComponent as ChevronSVG } from '../../../assets/images/chevron.svg';
import { LookupContext } from '../../../contexts/LookupContext';
import { Supplier } from '../../../types/types';
import Button from '../../Form/Button';
import InputField from '../../Form/InputField';
import './LookupForm.css';
import SVGIcon from '../../SVGIcon/SVGIcon';

const LookupForm: React.FC = (): JSX.Element => {
  const { setFilterCriteria, filterCriteria } = useContext(LookupContext)!;
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
    const emptyState = { name: '', index: '', city: '' };
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
        <p className="lookup__title">Search criteria</p>
      </div>

      <form
        className="lookup-form__form"
        onSubmit={handleSubmit}
      >
        <div className="lookup-form__fields">
          {(Object.keys(formState) as Array<keyof Supplier>).map((key) => (
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
          ))}
        </div>
        <div className="lookup-form__buttons">
          <Button
            type="submit"
            className="lookup-form__button"
          >
            Search
          </Button>
          <Button
            type="reset"
            onClick={handleReset}
            className="lookup-form__button lookup-form__button--reset"
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
};

export default LookupForm;
