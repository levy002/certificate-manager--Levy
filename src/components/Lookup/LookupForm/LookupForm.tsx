import { useCallback, useState } from 'react';

import { ReactComponent as ChevronSVG } from '../../../assets/images/chevron.svg';
import { Supplier } from '../../../types/types';
import Button from '../../Form/Button';
import InputField from '../../Form/InputField';
import './LookupForm.css';
import SVGIcon from '../../SVGIcon/SVGIcon';

interface LookupModalFormProps {
  initialFilterCriteria: Supplier;
  handleFilterCriteria: (criteria: Supplier) => void;
}

const LookupForm: React.FC<LookupModalFormProps> = ({
  initialFilterCriteria,
  handleFilterCriteria,
}): JSX.Element => {
  const [formState, setFormState] = useState(initialFilterCriteria);

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
    const emptyState = {
      name: '',
      index: '',
      city: '',
    };
    setFormState(emptyState);
    handleFilterCriteria(formState);
  }, [formState]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      handleFilterCriteria(formState);
    },
    [formState],
  );

  const formFields = initialFilterCriteria
    ? Object.keys(initialFilterCriteria)
    : [];

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
          {formFields.map((key) => (
            <InputField
              key={key}
              type="text"
              label={key}
              name={key}
              value={formState[key as keyof Supplier]}
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
