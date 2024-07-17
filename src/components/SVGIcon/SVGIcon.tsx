import { SVGIconProps } from "../../types/types";

const SVGIcon: React.FC<SVGIconProps> = ({ Icon, width = 26, height= 26, fill= '#265c79', onClick }) => (
  <Icon
    width={width}
    height={height}
    fill={fill}
    onClick={onClick}
  />
);

export default SVGIcon;
