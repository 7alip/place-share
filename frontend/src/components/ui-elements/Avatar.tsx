import React from "react";

import AvatarProps from "../../models/avatar";

import "./Avatar.scss";

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className={`avatar ${props.className}`} style={{ width: props.width }}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.height }}
      />
    </div>
  );
};

export default Avatar;
