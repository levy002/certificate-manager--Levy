interface OptionsProps {
  options: { label: string; value: string }[];
}

export const Options = ({ options }: OptionsProps): JSX.Element => {
  return (
    <>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
};

export default Options;
