import React from "react";

import Modal from "./Modal";
import Button from "../form-elements/Button";
import ModalProps from "../../models/modal";

type ErrorModalProps = {
  onCancel?: ModalProps["onCancel"];
  header?: ModalProps["header"];
  show: ModalProps["show"];
  footer?: ModalProps["footer"];
  onClear: () => void;
  error: string;
};

const ErrorModal: React.FC<ErrorModalProps> = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
      {props.children}
    </Modal>
  );
};

export default ErrorModal;
