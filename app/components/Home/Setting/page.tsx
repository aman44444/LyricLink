import React from 'react';

const Settings: React.FC = () => {
  const toggleDarkMode = () => {
    
  };

  const handleLogout = () => {
   
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Settings;