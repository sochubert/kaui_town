import React from "react";
import { Facebook } from "react-spinners-css";

const Loader = () => {
  return (
    <Facebook
      color="#960018"
      style={{
        width: "120px",
        height: "120px",
        margin: "auto",
        "margin-top": "30px",
        display: "block",
      }}
    >
      <span className="sr-only"></span>
    </Facebook>
  );
};

export default Loader;
