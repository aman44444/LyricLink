import React from 'react';
import Link from 'next/link';

const Main: React.FC = () => {
  return (
    <div>
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