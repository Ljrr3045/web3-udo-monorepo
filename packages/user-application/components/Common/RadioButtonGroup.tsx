import React from "react";

interface IRadioButtonGroup {
  options: {
    value: string,
    label: string,
  }[],
  selectedOption: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const RadioButtonGroup = ({ options, selectedOption, handleChange }:IRadioButtonGroup) => {
  return (
    <div className="w-full flex flex-col items-star justify-star gap-1">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex flex-row items-center justify-start gap-2 text-sm font-bold text-black text-start"
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleChange}
            className="w-6 h-6 ring-blue-600"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
