import React from 'react';

const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  error = '' 
}) => {
  const id = `field-${name}`;
  
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-mark">*</span>}
      </label>
      
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-input ${error ? 'form-input-error' : ''}`}
      />
      
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormField;