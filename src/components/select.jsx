import React from "react";

const Select = ({ id, name, registerObj, options }) => {
  return (
    <select
      id={id}
      name={name}
      ref={registerObj.register()}
      className="rounded-full border h-8 focus:shadow-outline focus:outline-none px-3 mr-3 w-16"
    >
      {options.map((op) => {
        return (
          <option key={op.value} value={op.value}>
            {op.text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
