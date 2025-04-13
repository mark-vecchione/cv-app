import React from 'react';
import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

const ExperienceItem = ({ 
  item, 
  index, 
  onChange, 
  onRemove,
  errors = {}
}) => {
  const handleChange = (field, value) => {
    onChange(index, {
      ...item,
      [field]: value
    });
  };

  return (
    <div className="experience-item">
      <div className="experience-item-header">
        <h3>Experience #{index + 1}</h3>
        <Button 
          text="Remove" 
          variant="danger" 
          onClick={() => onRemove(index)}
        />
      </div>
      
      <div className="experience-item-fields">
        <FormField
          label="Company"
          name={`company-${index}`}
          value={item.company || ''}
          onChange={(e) => handleChange('company', e.target.value)}
          required={true}
          error={errors.company || ''}
        />
        
        <FormField
          label="Position"
          name={`position-${index}`}
          value={item.position || ''}
          onChange={(e) => handleChange('position', e.target.value)}
          required={true}
          error={errors.position || ''}
        />
        
        <div className="date-fields">
          <FormField
            label="Start Date"
            type="date"
            name={`startDate-${index}`}
            value={item.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            required={true}
            error={errors.startDate || ''}
          />
          
          <FormField
            label="End Date"
            type="date"
            name={`endDate-${index}`}
            value={item.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            placeholder="Leave blank if current position"
            error={errors.endDate || ''}
          />
        </div>
        
        <FormField
          label="Responsibilities"
          name={`responsibilities-${index}`}
          value={item.responsibilities || ''}
          onChange={(e) => handleChange('responsibilities', e.target.value)}
          placeholder="Describe your main responsibilities and achievements"
          error={errors.responsibilities || ''}
        />
      </div>
    </div>
  );
};

const ExperienceItemView = ({ item }) => {
  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="experience-item-preview">
      <div className="preview-experience-header">
        <h3 className="preview-company">{item.company}</h3>
        <div className="preview-date-range">
          {formatDate(item.startDate)} - {formatDate(item.endDate)}
        </div>
      </div>
      
      <div className="preview-position">{item.position}</div>
      
      {item.responsibilities && (
        <div className="preview-responsibilities">{item.responsibilities}</div>
      )}
    </div>
  );
};

const Experience = ({ 
  items, 
  updateItems, 
  isEditing = true,
  errors = []
}) => {
  const handleItemChange = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    updateItems(newItems);
  };

  const handleAddItem = () => {
    updateItems([
      ...items,
      { 
        id: Date.now(), 
        company: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        responsibilities: '' 
      }
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  return (
    <FormSection title="Work Experience" editing={isEditing}>
      {isEditing ? (
        <div className="experience-form">
          {items.map((item, index) => (
            <ExperienceItem
              key={item.id || index}
              item={item}
              index={index}
              onChange={handleItemChange}
              onRemove={handleRemoveItem}
              errors={errors[index] || {}}
            />
          ))}
          
          <div className="add-item-button">
            <Button
              text="Add Experience"
              variant="secondary"
              onClick={handleAddItem}
            />
          </div>
        </div>
      ) : (
        <div className="experience-preview">
          {items.length > 0 ? (
            items.map((item, index) => (
              <ExperienceItemView key={item.id || index} item={item} />
            ))
          ) : (
            <p className="no-data-message">No work experience added.</p>
          )}
        </div>
      )}
    </FormSection>
  );
};

export default Experience;