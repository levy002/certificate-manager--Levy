interface ExampleProps {
  name: string;
}

const Example: React.FC<ExampleProps> = ({ name }: ExampleProps) => {
  return <p>{name}</p>;
};

export default Example;
