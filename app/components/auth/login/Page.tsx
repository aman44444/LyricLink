import React, { useState } from 'react'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='w-full h-screen'> Login
       <div className=''>
           <form>
             <input 
             onChange={(e) => setEmail(e.target.value)}
             type="email"
              placeholder='Email'/>
             <input 
              onChange={(e) => setPassword(e.target.value)}
             type='password' 
             placeholder='Password'/>
             <button>Sign In</button>
           </form>
       </div>
    </div>

  )
}

export default Login