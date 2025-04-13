import React from 'react';
import Button from './Button';

const FormControls = ({ 
  onSubmit, 
  onEdit, 
  isEditing = true,
  isValid = true,
  isSaved = false
}) => {
  return (
    <div className="form-controls">
      {isEditing ? (
        // In edit mode - show submit button
        <Button
          text={isSaved ? "Update CV" : "Save CV"}
          type="submit"
          variant="primary"
          onClick={onSubmit}
          disabled={!isValid}
        />
      ) : (
        // In view mode - show edit button
        <Button
          text="Edit CV"
          variant="secondary"
          onClick={onEdit}
        />
      )}
    </div>
  );
};

export default FormControls;