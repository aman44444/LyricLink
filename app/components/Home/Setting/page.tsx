import React from 'react';

const Settings: React.FC = () => {

  const handleLogout = () => {
   
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Settings;