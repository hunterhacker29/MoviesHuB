import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import '../Styles/signup.css';  // Import the CSS file

const auth = getAuth(app);

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const createUser = (e) => {
    e.preventDefault(); // Prevent form submission

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log('Sign up successfully');
        alert('Sign up successfully');
        navigate('/'); // Navigate to '/' after successful signup

        // Clear form fields
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error:', errorCode, errorMessage);
        alert(`Error: ${errorMessage}`);
      });
  };

  return (
    <div className="signup-container">  {/* Container with background */}
      <form onSubmit={createUser} className="signup-form"> {/* Styled form */}
        <div className="mb-3 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
