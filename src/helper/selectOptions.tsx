interface OptionsProps<T> {
  options: T[];
  getOptionValue: (option: T) => string;
  getOptionName: (option: T) => string;
}

const Options = <T,>({
  options,
  getOptionValue,
  getOptionName,
}: OptionsProps<T>): JSX.Element => {
  return (
    <>
      {options.map((option) => (
        <option
          key={getOptionValue(option)}
          value={getOptionValue(option)}
        >
          {getOptionName(option)}
        </option>
      ))}
    </>
  );
};

export default Options;
