import React, { useState } from 'react'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit =async (e:MouseEvent) => {
       e.preventDefault();
       setError('')
       try {
        await logIn(email,password)
       } catch (error:any){
        console.log(error);
        setError(error.message)
       }
  }

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