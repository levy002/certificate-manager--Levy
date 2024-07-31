interface SVGIconProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  Icon,
  width = 26,
  height = 26,
  fill = '#265c79',
  onClick,
}: SVGIconProps) => {
  return (
    <Icon
      width={width}
      height={height}
      fill={fill}
      onClick={onClick}
    />
  );
};

export default SVGIcon;
