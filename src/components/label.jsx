import React from "react";

const Label = ({ htmlFor, text, styles }) => {
  return (
    <label htmlFor={htmlFor} className={styles}>
      {text}
    </label>
  );
};

export default Label;
