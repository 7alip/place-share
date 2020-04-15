import React, { useReducer, useEffect } from "react";

import { FormProps } from "../../models/form";
import { validate } from "../../utils/validator";

import "./Input.scss";

type State = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

type Action =
  | {
      type: "CHANGE";
      val: string;
      validators: { type: string; val?: number }[];
    }
  | { type: "TOUCH" };

const inputReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val!, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input: React.FC<FormProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element = (
    <props.element
      id={props.id}
      rows={props.element !== "input" ? props.rows || 3 : undefined}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />
  );

  const setClassName = () => {
    const _className = ["form-control"];

    if (!inputState.isValid && inputState.isTouched)
      _className.push("form-control--invalid");

    return _className.join(" ");
  };

  return (
    <div className={setClassName()}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
