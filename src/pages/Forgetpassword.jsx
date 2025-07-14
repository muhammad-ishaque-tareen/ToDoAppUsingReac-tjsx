import React, { useState } from 'react';
import './Forgetpassword.css';
import { useNavigate } from 'react-router-dom';

export default function Forgetpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes('@')) {
      setErrorMsg('Please enter a valid email');
    } else {
      setErrorMsg('');
    }
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    if (!email || !newPassword || !rePassword) {
      setErrorMsg('All fields are required');
      return;
    }
    if (newPassword !== rePassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    alert(`Forget password is not implemented yet.`);
    setEmail('');
    setNewPassword('');
    setRePassword('');
    setErrorMsg('');
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleForgetPassword}>
        <h2>Reset Your Password</h2>

        <input
          type="email"
          value={email}
          placeholder="Enter your registered email"
          onChange={handleEmailChange}
          required
        />

        <input
          type="password"
          value={newPassword}
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          value={rePassword}
          placeholder="Re-enter new password"
          onChange={(e) => setRePassword(e.target.value)}
          required
        />

        {errorMsg && <p >{errorMsg}</p>}

        <div className="button-row">
          <button type="button" onClick={() => navigate("/login")}>
            Back
          </button>
          <button type="submit">Change</button>
        </div>
      </form>
    </div>
  );
}
