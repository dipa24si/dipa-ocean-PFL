import React from "react";

const SelectField = ({ label, value, onChange, options, error, name }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        name={name}   
        value={value}
        onChange={onChange}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default SelectField;;