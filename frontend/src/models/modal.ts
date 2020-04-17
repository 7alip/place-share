interface ModalProps {
  className?: string;
  style?: React.StyleHTMLAttributes<HTMLDivElement>;
  header?: string;
  onSubmit?: (
    event: React.MouseEvent<React.FormEvent, HTMLFormElement> | any
  ) => void;
  contentClass?: string;
  footerClass?: string;
  footer?: React.ReactNode;
  show: boolean;
  onCancel?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default ModalProps;
