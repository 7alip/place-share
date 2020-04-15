export type IValidator = {
  type: string;
  val?: number;
};

export type IFormChangeHandler = (
  id: string,
  value: string,
  isInvalid: boolean
) => void;

export interface FormProps {
  id: string;
  validators: IValidator[];
  initialValue?: string;
  initialValid?: boolean;
  element: "input" | "textarea";
  type?: string;
  placeholder?: string;
  rows?: number;
  label?: string;
  errorText: string;
  onInput: IFormChangeHandler;
  value?: string;
}
