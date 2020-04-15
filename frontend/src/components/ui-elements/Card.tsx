import React from "react";

import CardProps from "../../models/card";

import "./Card.scss";

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`card${props.className ? " " + props.className : ""}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;
