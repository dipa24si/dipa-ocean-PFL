import React from "react";

const InputField = ({ label, type, value, onChange, error, name }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}   
        onChange={onChange}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;