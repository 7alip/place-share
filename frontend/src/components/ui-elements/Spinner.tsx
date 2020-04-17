import React from "react";

import "./Spinner.scss";

type SpinnerProps = {
  asOverlay?: true;
};

const Spinner: React.FC<SpinnerProps> = (props) => (
  <div className={`${props.asOverlay && "spinner__overlay"}`}>
    <div className="spinner"></div>
  </div>
);

export default Spinner;
