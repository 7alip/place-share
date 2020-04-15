interface SideDrawerProps {
  show: boolean;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children: React.ReactNode;
}

export default SideDrawerProps;
