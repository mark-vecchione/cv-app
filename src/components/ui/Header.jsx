import React from 'react';
import Button from './Button';

const Header = ({ 
  title = 'CV Builder',
  isEditing,
  onToggleMode
}) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">{title}</h1>
        <div className="header-controls">
          <Button 
            text={isEditing ? 'Preview CV' : 'Edit CV'} 
            onClick={onToggleMode}
            variant={isEditing ? 'secondary' : 'primary'}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;