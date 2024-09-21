import React from 'react';
import Logout from '../../Logout/Logout';

const Settings: React.FC = () => {

  return (
    <div className='p-3'>
      <h2 className='m-7 text-xl'>Settings</h2>
      <div>
        <Logout/>
      </div>
    </div>
  );
};

export default Settings;