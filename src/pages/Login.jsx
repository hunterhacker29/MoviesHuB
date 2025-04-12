
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../Styles/login.css';  // Import the CSS file
// import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from '../firebase/Firebase';
// import { Link, useNavigate } from 'react-router-dom';

// const auth = getAuth(app);

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log("signed in...");
//         alert("signed in ");
//         navigate('/home');
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(error);
//       });
//   };

//   const handleGoogleSignIn = () => {
//     const provider = new GoogleAuthProvider();

//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const user = result.user;
//         console.log("Google sign-in successful");
//         alert("Google sign-in successful");
//         navigate('/home');
//       })
//       .catch((error) => {
//         console.error("Google sign-in error:", error);
//       });
//   };

//   return (
//     <div className="login-container">  {/* Container with background */}
//       <form onSubmit={handleSubmit} className="login-form">  {/* Form with custom class */}
//         <div className="mb-3 mt-5">
//           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//           />
//           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>

//         <h1>Or</h1>

//         <button type="button" className="btn btn-primary" onClick={handleGoogleSignIn}>Google</button> 
        
//         <Link to='/signup' button type="button" className="btn btn-primary"> Signup </Link>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from "react";
import { getAuth, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";
import { app } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const storedEmail = window.localStorage.getItem("emailForSignIn");
      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then(() => {
            alert("Login successful!");
            navigate("/home");
            window.localStorage.removeItem("emailForSignIn"); // Clear stored email
          })
          .catch((error) => {
            console.error("Sign-in error:", error);
            alert("Error signing in. Please try again.");
          });
      }
    }
  }, [navigate]);

  const handleEmailSignIn = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const actionCodeSettings = {
      url: "http://localhost:3000/login", // Redirect URL after email click
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email); // Store email temporarily
        alert("Sign-in link sent! Check your email.");
      })
      .catch((error) => {
        console.error("Error sending sign-in link:", error);
        alert("Failed to send sign-in link.");
      });
  };

  return (
    <div className="login-container">
      <h2>Login with Email Link</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
      />
      <button onClick={handleEmailSignIn} className="btn btn-primary">
        Send Sign-in Link
      </button>
    </div>
  );
}

export default Login;
