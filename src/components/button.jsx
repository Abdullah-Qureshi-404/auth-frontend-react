import React from "react";

const Button = ({ children, type = "button", onClick ,className}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
export default Button;
