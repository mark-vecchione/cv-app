import React from 'react';
import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';

const GeneralInfo = ({ 
  data, 
  updateData, 
  isEditing = true,
  errors = {}
}) => {
  const handleChange = (field, value) => {
    updateData({
      ...data,
      [field]: value
    });
  };

  return (
    <FormSection title="Personal Information" editing={isEditing}>
      {isEditing ? (
        // Edit mode - show form fields
        <div className="general-info-form">
          <FormField
            label="Full Name"
            name="name"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            required={true}
            error={errors.name || ''}
          />
          
          <FormField
            label="Email"
            type="email"
            name="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            required={true}
            error={errors.email || ''}
          />
          
          <FormField
            label="Phone Number"
            type="tel"
            name="phone"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone || ''}
          />
          
          <FormField
            label="Location"
            name="location"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, Country"
            error={errors.location || ''}
          />
        </div>
      ) : (
        // View mode - show formatted information
        <div className="general-info-preview">
          <h3 className="preview-name">{data.name}</h3>
          
          <div className="preview-contact-info">
            {data.email && (
              <div className="preview-item">
                <span className="preview-label">Email:</span>
                <span className="preview-value">{data.email}</span>
              </div>
            )}
            
            {data.phone && (
              <div className="preview-item">
                <span className="preview-label">Phone:</span>
                <span className="preview-value">{data.phone}</span>
              </div>
            )}
            
            {data.location && (
              <div className="preview-item">
                <span className="preview-label">Location:</span>
                <span className="preview-value">{data.location}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </FormSection>
  );
};

export default GeneralInfo;