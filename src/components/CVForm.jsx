import React, { useState, useEffect } from 'react';
import GeneralInfo from './sections/GeneralInfo';
import Education from './sections/Education';
import Experience from './sections/Experience';
import FormControls from './ui/FormControls';

const CVForm = ({ onSave, initialData = null, isEditing, setIsEditing }) => {
  // Form state for each section
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  
  const [education, setEducation] = useState([
    { id: Date.now(), school: '', major: '', graduationDate: '' }
  ]);
  
  const [experience, setExperience] = useState([
    { 
      id: Date.now(), 
      company: '', 
      position: '', 
      startDate: '', 
      endDate: '', 
      responsibilities: '' 
    }
  ]);
  
  // Validation state
  const [errors, setErrors] = useState({
    generalInfo: {},
    education: [],
    experience: []
  });
  
  // Form status
  const [isSaved, setIsSaved] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  // Initialize form with data if provided
  useEffect(() => {
    if (initialData) {
      if (initialData.generalInfo) setGeneralInfo(initialData.generalInfo);
      if (initialData.education && initialData.education.length > 0) {
        setEducation(initialData.education);
      }
      if (initialData.experience && initialData.experience.length > 0) {
        setExperience(initialData.experience);
      }
      setIsSaved(true);
    }
  }, [initialData]);
  
  // Validate form whenever data changes
  useEffect(() => {
    validateForm();
  }, [generalInfo, education, experience]);
  
  // Validate all form data
  const validateForm = () => {
    const newErrors = {
      generalInfo: {},
      education: [],
      experience: []
    };
    
    // Validate general info
    if (!generalInfo.name) newErrors.generalInfo.name = 'Name is required';
    if (!generalInfo.email) newErrors.generalInfo.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(generalInfo.email)) {
      newErrors.generalInfo.email = 'Email is invalid';
    }
    
    // Validate education entries
    education.forEach((edu, index) => {
      const eduErrors = {};
      if (!edu.school) eduErrors.school = 'School name is required';
      if (!edu.major) eduErrors.major = 'Major is required';
      
      if (Object.keys(eduErrors).length > 0) {
        newErrors.education[index] = eduErrors;
      }
    });
    
    // Validate experience entries
    experience.forEach((exp, index) => {
      const expErrors = {};
      if (!exp.company) expErrors.company = 'Company name is required';
      if (!exp.position) expErrors.position = 'Position is required';
      if (!exp.startDate) expErrors.startDate = 'Start date is required';
      
      if (Object.keys(expErrors).length > 0) {
        newErrors.experience[index] = expErrors;
      }
    });
    
    setErrors(newErrors);
    
    // Check if form is valid (no errors)
    const hasGeneralInfoErrors = Object.keys(newErrors.generalInfo).length > 0;
    const hasEducationErrors = newErrors.education.some(edu => edu && Object.keys(edu).length > 0);
    const hasExperienceErrors = newErrors.experience.some(exp => exp && Object.keys(exp).length > 0);
    
    setIsValid(!hasGeneralInfoErrors && !hasEducationErrors && !hasExperienceErrors);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isValid) return;
    
    const formData = {
      generalInfo,
      education,
      experience
    };
    
    onSave(formData);
    setIsSaved(true);
    setIsEditing(false);
  };
  
  // Handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  return (
    <form onSubmit={handleSubmit} className="cv-form">
      <GeneralInfo 
        data={generalInfo} 
        updateData={setGeneralInfo} 
        isEditing={isEditing}
        errors={errors.generalInfo}
      />
      
      <Education 
        items={education} 
        updateItems={setEducation} 
        isEditing={isEditing}
        errors={errors.education}
      />
      
      <Experience 
        items={experience} 
        updateItems={setExperience} 
        isEditing={isEditing}
        errors={errors.experience}
      />
      
      <FormControls 
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        isEditing={isEditing}
        isValid={isValid}
        isSaved={isSaved}
      />
    </form>
  );
};

export default CVForm;