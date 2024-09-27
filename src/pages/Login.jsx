
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/login.css';  // Import the CSS file
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase/Firebase';
import { Link, useNavigate } from 'react-router-dom';

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("signed in...");
        alert("signed in ");
        navigate('/29062023home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google sign-in successful");
        alert("Google sign-in successful");
        navigate('/29062023home');
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  };

  return (
    <div className="login-container">  {/* Container with background */}
      <form onSubmit={handleSubmit} className="login-form">  {/* Form with custom class */}
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
        <button type="submit" className="btn btn-primary">Login</button>

        <h1>Or</h1>

        <button type="button" className="btn btn-primary" onClick={handleGoogleSignIn}>Google</button> 
    
        <Link to='/signup' button type="button" className="btn btn-primary"> Signup </Link>
      </form>
    </div>
  );
}

export default Login;
