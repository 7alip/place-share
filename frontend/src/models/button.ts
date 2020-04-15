interface ButtonProps {
  href?: string;
  size?: string;
  children?: React.ReactNode;
  inverse?: boolean | undefined;
  danger?: boolean | undefined;
  to?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean | undefined;
}

export default ButtonProps;
