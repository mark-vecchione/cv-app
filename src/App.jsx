import { useState } from 'react';
import './App.css';
import Header from './components/ui/Header';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';

function App() {
  // Main application state
  const [cvData, setCvData] = useState({
    generalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    education: [
      { id: Date.now(), school: '', major: '', graduationDate: '' }
    ],
    experience: [
      { 
        id: Date.now() + 1, 
        company: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        responsibilities: '' 
      }
    ]
  });
  
  // Editing mode state
  const [isEditing, setIsEditing] = useState(true);
  
  // Handle saving CV data
  const handleSave = (data) => {
    setCvData(data);
    setIsEditing(false);
  };
  
  // Toggle between edit and preview modes
  const toggleMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="app">
      <Header 
        title="CV Builder" 
        isEditing={isEditing} 
        onToggleMode={toggleMode} 
      />
      
      <main className="app-content">
        {isEditing ? (
          <CVForm 
            onSave={handleSave} 
            initialData={cvData} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
          />
        ) : (
          <CVPreview data={cvData} />
        )}
      </main>
      
      <footer className="app-footer">
        <p>CV Builder Application | © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
