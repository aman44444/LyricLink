import React from 'react';
import Link from 'next/link';

const Main: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Our Dating and Music App</h1>
      <p>Find your perfect match based on music preferences!</p>
      <div>
        <Link href="/Pages/login" legacyBehavior>
          <a>Login</a>
        </Link>
        <Link href="/Pages/signup" legacyBehavior>
          <a>Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Main;