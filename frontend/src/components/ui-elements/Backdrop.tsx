import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.scss";

const Backdrop: React.FC<{
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = (props) => {
  const content = <div className="backdrop" onClick={props.onClick}></div>;

  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook") as HTMLDivElement
  );
};

export default Backdrop;
