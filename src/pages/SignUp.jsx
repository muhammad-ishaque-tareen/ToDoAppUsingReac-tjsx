import React, { useState } from 'react'

export default function SignUp() {
  const[firstname, setFirstname] = useState('');
  const[secondname, setSecondname] = useState('');
  const[username, setUsername]= useState('');
  const[email, setEmail]= useState('');
  const[password, setPassword] = useState('');
  const[errormessage, setErrormessage] = useState('');
  const handleEmail=(e)=>
  {
    if(!email.includes('@'))
    {
      setErrormessage("Please Enter a Valid Email");
    }
    else
    {
      setEmail(e.target.value);
    }
  }

  return (
    <div className='singup-container'>
      
      <form className='signup-form'>
        <h3>SignUp</h3>
        <input type="text" 
        value={firstname}
        placeholder='Enter Your First Name'
        onChange={(e)=>e.setFirstname(e.target.value)}
        />
        <input type="text" 
        value={secondname}
        placeholder='Enter Your Second Name'
        onChange={(e)=>e.setSecondname(e.target.value)}
        />
        <input type="text" 
        value={username}
        placeholder='Enter Your user Name without white spaces'
        onChange={(e)=>e.setUsername(e.target.value)}
        />
        <input type="email" 
        value={email}
        placeholder='Enter a valid Email'
        onChange={handleEmail}
        />

      </form>
    </div>
  );
}
