import React from 'react'
const Login = () => {
  return (
    <div className='w-full h-screen'> Login
       <div className=''>
           <form>
             <input type="email" placeholder='Email'/>
             <input type='password' placeholder='Password'/>
             <button>Sign In</button>
           </form>
       </div>
    </div>

  )
}

export default Login