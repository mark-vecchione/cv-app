import React from 'react';

const CVPreview = ({ data }) => {
  // Destructure CV data
  const { generalInfo, education, experience } = data;
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="cv-preview">
      {/* Header / General Info */}
      <div className="preview-header">
        <h1 className="preview-name">{generalInfo.name}</h1>
        <div className="preview-contact-info">
          {generalInfo.email && (
            <div className="preview-contact-item">
              <span className="preview-label">Email:</span>
              <span className="preview-value">{generalInfo.email}</span>
            </div>
          )}
          
          {generalInfo.phone && (
            <div className="preview-contact-item">
              <span className="preview-label">Phone:</span>
              <span className="preview-value">{generalInfo.phone}</span>
            </div>
          )}
          
          {generalInfo.location && (
            <div className="preview-contact-item">
              <span className="preview-label">Location:</span>
              <span className="preview-value">{generalInfo.location}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Education Section */}
      <div className="preview-section">
        <h2 className="preview-section-title">Education</h2>
        {education.length > 0 ? (
          <div className="preview-education-list">
            {education.map((edu, index) => (
              <div key={edu.id || index} className="preview-education-item">
                <div className="preview-education-header">
                  <h3 className="preview-school">{edu.school}</h3>
                  {edu.graduationDate && (
                    <div className="preview-graduation-date">
                      {formatDate(edu.graduationDate)}
                    </div>
                  )}
                </div>
                <div className="preview-major">{edu.major}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data-message">No education history added.</p>
        )}
      </div>
      
      {/* Experience Section */}
      <div className="preview-section">
        <h2 className="preview-section-title">Work Experience</h2>
        {experience.length > 0 ? (
          <div className="preview-experience-list">
            {experience.map((exp, index) => (
              <div key={exp.id || index} className="preview-experience-item">
                <div className="preview-experience-header">
                  <h3 className="preview-company">{exp.company}</h3>
                  <div className="preview-date-range">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </div>
                </div>
                <div className="preview-position">{exp.position}</div>
                {exp.responsibilities && (
                  <div className="preview-responsibilities">{exp.responsibilities}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data-message">No work experience added.</p>
        )}
      </div>
    </div>
  );
};

export default CVPreview;