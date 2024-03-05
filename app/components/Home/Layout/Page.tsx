import React from 'react';

const Layout: React.FC = ({ }) => {
  return (
    <div>
      <header>
        
        <h1>Dating and Music App</h1>
      </header>
      <main>{}</main>
      <footer>
       
        <p>&copy; {new Date().getFullYear()} Dating and Music App</p>
      </footer>
    </div>
  );
};

export default Layout;