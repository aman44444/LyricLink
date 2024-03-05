"use client"
import firebase from 'firebase/compat/app';
import React, { useState } from 'react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
     try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error('Error signing up:', error.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
 
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;