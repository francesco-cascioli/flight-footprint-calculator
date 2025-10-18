import React from "react";

interface PassengerInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PassengerInput: React.FC<PassengerInputProps> = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="passengers">Number of passengers</label>
      <input
        id="passengers"
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Number of passengers"
      />
    </div>
  );
};

export default PassengerInput;
