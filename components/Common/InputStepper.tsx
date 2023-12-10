import React from 'react';

interface InputStepperProps {
  quantity: number;
  setQuantity: (value: number) => void;
  minimumQuantity?: number;
}

const classes = {
  stepper: 'border-2',
  stepperDownButon: 'px-3 border-r-2',
  stepperUpButton: 'px-3 border-l-2',
  stepperUpValue: 'px-0 w-8 text-center',
};

const InputStepper: React.FC<InputStepperProps> = (props) => {
  const { quantity, setQuantity, minimumQuantity } = props;

  const updateQuantity = (value: number) => {
    const newQuantity = quantity + value;

    if (minimumQuantity && newQuantity < minimumQuantity) {
      setQuantity(minimumQuantity);
    } else {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={classes.stepper}>
      <button
        className={classes.stepperDownButon}
        onClick={() => updateQuantity(-1)}
      >
        -
      </button>
      <input
        type="number"
        className={classes.stepperUpValue}
        value={quantity}
        disabled
      />
      <button
        className={classes.stepperUpButton}
        onClick={() => updateQuantity(1)}
      >
        +
      </button>
    </div>
  );
};

export default InputStepper;
