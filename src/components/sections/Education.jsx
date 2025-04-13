import React from 'react';
import FormSection from '../ui/FormSection';
import FormField from '../ui/FormField';
import Button from '../ui/Button';

const EducationItem = ({ 
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
    <div className="education-item">
      <div className="education-item-header">
        <h3>Education #{index + 1}</h3>
        <Button 
          text="Remove" 
          variant="danger" 
          onClick={() => onRemove(index)}
        />
      </div>
      
      <div className="education-item-fields">
        <FormField
          label="School"
          name={`school-${index}`}
          value={item.school || ''}
          onChange={(e) => handleChange('school', e.target.value)}
          required={true}
          error={errors.school || ''}
        />
        
        <FormField
          label="Major"
          name={`major-${index}`}
          value={item.major || ''}
          onChange={(e) => handleChange('major', e.target.value)}
          required={true}
          error={errors.major || ''}
        />
        
        <FormField
          label="Graduation Date"
          type="date"
          name={`graduationDate-${index}`}
          value={item.graduationDate || ''}
          onChange={(e) => handleChange('graduationDate', e.target.value)}
          error={errors.graduationDate || ''}
        />
      </div>
    </div>
  );
};

const EducationItemView = ({ item }) => {
  return (
    <div className="education-item-preview">
      <div className="preview-education-header">
        <h3 className="preview-school">{item.school}</h3>
        {item.graduationDate && (
          <div className="preview-graduation-date">
            {new Date(item.graduationDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </div>
        )}
      </div>
      
      <div className="preview-major">{item.major}</div>
    </div>
  );
};

const Education = ({ 
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
      { id: Date.now(), school: '', major: '', graduationDate: '' }
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  return (
    <FormSection title="Education" editing={isEditing}>
      {isEditing ? (
        <div className="education-form">
          {items.map((item, index) => (
            <EducationItem
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
              text="Add Education"
              variant="secondary"
              onClick={handleAddItem}
            />
          </div>
        </div>
      ) : (
        <div className="education-preview">
          {items.length > 0 ? (
            items.map((item, index) => (
              <EducationItemView key={item.id || index} item={item} />
            ))
          ) : (
            <p className="no-data-message">No education history added.</p>
          )}
        </div>
      )}
    </FormSection>
  );
};

export default Education;