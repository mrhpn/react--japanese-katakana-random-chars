import React from "react";

const Button = ({ type, text, Icon, title, styles, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick && onClick}
      title={title}
      className={styles}
    >
      {text ? text : Icon}
    </button>
  );
};

export default Button;
