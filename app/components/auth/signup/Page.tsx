import React, { useState } from 'react'

const Signup = () => {
const [email,setEmail] = useState('');
const [password,setPassword] = useState('')


  return (
    <div>Signup
     <div>
        <input type='email' placeholder='Email'/>
        <input type="password" placeholder="Password"/>
        <button>Signup</button>
     </div>

    </div>
  )
}

export default Signup