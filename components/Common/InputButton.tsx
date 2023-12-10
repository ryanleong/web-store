import React from "react";

interface InputButtonProps {
  label: string;
  onClick: () => void;
  styleOverride?: string;
}

const classes = {
  button: "w-full h-12 text-white bg-red-700 rounded-full",
};

const InputButton: React.FC<InputButtonProps> = (props) => {
  const { label, onClick, styleOverride } = props;

  return (
    <button className={`${classes.button} ${styleOverride}`} onClick={onClick}>
      { label }
    </button>
  );
};

export default InputButton;
