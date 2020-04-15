import React from "react";

import { Link } from "react-router-dom";

import ButtonProps from "../../models/button";

import "./Button.scss";

const Button: React.FC<ButtonProps> = (props) => {
  const setClassName = () => {
    let _classNAme = ["button"];

    if (props.size) _classNAme.push(`button--${props.size}`);
    else _classNAme.push("button--default");

    if (props.inverse) _classNAme.push("button--inverse");
    if (props.danger) _classNAme.push("button--danger");

    return _classNAme.join(" ");
  };

  if (props.href) {
    return (
      <a className={setClassName()} href={props.href}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link to={props.to} className={setClassName()}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={setClassName()}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
