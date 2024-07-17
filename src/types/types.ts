export interface ExampleProps {
    name: string
}
 
export interface SVGIconProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  width?: number;
  height?: number;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

export interface SidebarProps {
  showMobileSidebar: boolean
}

export interface MenuNavLinkProps {
  to: string;
  desc: React.ReactNode;
}

export type machineLearningExampleType = {
  name: string
}
