interface OptionsProps<T> {
  options: T[];
}

const Options = <T extends string>({
  options,
}: OptionsProps<T>): JSX.Element => {
  return (
    <>
      {options.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </>
  );
};

export default Options;
