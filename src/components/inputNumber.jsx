import React from "react";

const InputNumber = ({ id, name, registerObj, placeholder }) => {
  return (
    <input
      id={id}
      name={name}
      ref={registerObj.register(registerObj.rules)}
      type="number"
      className="rounded-full border h-8 focus:shadow-outline focus:outline-none px-3 mr-3 w-16 md:w-32"
      placeholder={placeholder}
    />
  );
};

export default InputNumber;
