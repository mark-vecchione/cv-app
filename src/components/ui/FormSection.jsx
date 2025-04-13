import React from 'react';

const FormSection = ({ 
  title, 
  children, 
  className = '',
  editing = true
}) => {
  return (
    <section className={`form-section ${className}`}>
      <div className="form-section-header">
        <h2 className="form-section-title">{title}</h2>
      </div>
      
      {editing ? (
        <div className="form-section-content">
          {children}
        </div>
      ) : (
        <div className="form-section-preview">
          {children}
        </div>
      )}
    </section>
  );
};

export default FormSection;