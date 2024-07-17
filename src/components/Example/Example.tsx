import { ExampleProps } from "../../types/types";

const Example: React.FC<ExampleProps> = ({name}) => {
  return (
    <p>{name}</p>
  )
}

export default Example;
