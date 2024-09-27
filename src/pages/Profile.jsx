// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import { db, storage } from '../firebase/Firebase'; // Adjust this import based on your Firebase setup
// import { doc, setDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import Navbar from '../components/Navbar';
// import { Navigate,Link } from 'react-router-dom';

// function Profile() {
//   const [fname, setFname] = useState('');
//   const [lname, setLname] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zip, setZip] = useState('');
//   const [file, setFile] = useState(null);
//   const [email, setEmail] = useState('');
//   const [errors, setErrors] = useState({});

  

//   const validateForm = () => {
//     const newErrors = {};
//     if (!fname) newErrors.firstName = 'First name is required';
//     if (!lname) newErrors.lastName = 'Last name is required';
//     if (!email) newErrors.email = 'Email is required';
//     if (!city) newErrors.city = 'City is required';
//     if (!state) newErrors.state = 'State is required';
//     if (!zip) newErrors.zip = 'Zip is required';
//     if (!file) newErrors.file = 'File is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       try {
//         // Upload file to Firebase Storage
//         const fileRef = ref(storage, `files/${file.name}`);
//         await uploadBytes(fileRef, file);
//         const fileURL = await getDownloadURL(fileRef);

//         // Save data to Firestore
//         await setDoc(doc(db, 'profiles', email), {
//           fname,
//           lname,
//           email,
//           city,
//           state,
//           zip,
//           fileURL
//         });

//         console.log('Document successfully written!');
//         Navigate('/viewprofile')
//       } catch (error) {
//         console.error('Error writing document: ', error);
//         // Handle error (e.g., show error message to the user)
//       }
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Form noValidate onSubmit={handleSubmit}>
//         <Row className="mb-3 mt-5">
//           <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
//             <Form.Label>First name</Form.Label>
//             <Form.Control
//               type="text"
//               name="firstName"
//               value={fname}
//               onChange={(e) => setFname(e.target.value)}
//               isInvalid={!!errors.firstName}
//             />
//             <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="4" controlId="validationFormik102" className="position-relative">
//             <Form.Label>Last name</Form.Label>
//             <Form.Control
//               type="text"
//               name="lastName"
//               value={lname}
//               onChange={(e) => setLname(e.target.value)}
//               isInvalid={!!errors.lastName}
//             />
//             <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
//             <Form.Label>Email</Form.Label>
//             <InputGroup hasValidation>
//               <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//               <Form.Control
//                 type="email"
//                 placeholder="Email"
//                 aria-describedby="inputGroupPrepend"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 isInvalid={!!errors.email}
//               />
//               <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//             </InputGroup>
//           </Form.Group>
//         </Row>
//         <Row className="mb-3">
//           <Form.Group as={Col} md="6" controlId="validationFormik103" className="position-relative">
//             <Form.Label>City</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="City"
//               name="city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               isInvalid={!!errors.city}
//             />
//             <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="3" controlId="validationFormik104" className="position-relative">
//             <Form.Label>State</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="State"
//               name="state"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               isInvalid={!!errors.state}
//             />
//             <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group as={Col} md="3" controlId="validationFormik105" className="position-relative">
//             <Form.Label>Zip</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Zip"
//               name="zip"
//               value={zip}
//               onChange={(e) => setZip(e.target.value)}
//               isInvalid={!!errors.zip}
//             />
//             <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
//           </Form.Group>
//         </Row>
//         <Form.Group className="position-relative mb-3">
//           <Form.Label>File</Form.Label>
//           <Form.Control
//             type="file"
//             required
//             name="file"
//             onChange={handleFileChange}
//             isInvalid={!!errors.file}
//           />
//           <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
//         </Form.Group>

//         <Button type="submit">create profile </Button>  or 
//         <Link to='/viewprofile'>
        
        
        
//         <Button type="submit">
          
//               view profile
          
//           </Button>
//         </Link>

//       </Form>
//     </>
//   );
// }

// export default Profile;
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { db, storage } from '../firebase/Firebase'; // Adjust this import based on your Firebase setup
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar';
import { useNavigate,Link } from 'react-router-dom'; // Updated to use useNavigate

function Profile() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage submission status
  const navigate = useNavigate(); // Use useNavigate hook

  const validateForm = () => {
    const newErrors = {};
    if (!fname) newErrors.firstName = 'First name is required';
    if (!lname) newErrors.lastName = 'Last name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!zip) newErrors.zip = 'Zip is required';
    if (!file) newErrors.file = 'File is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        // Upload file to Firebase Storage
        const fileRef = ref(storage, `files/${file.name}`);
        await uploadBytes(fileRef, file);
        const fileURL = await getDownloadURL(fileRef);

        // Save data to Firestore
        await setDoc(doc(db, 'profiles', email), {
          fname,
          lname,
          email,
          city,
          state,
          zip,
          fileURL
        });

        console.log('Document successfully written!');
        setIsSubmitted(true); // Update submission status
      } catch (error) {
        console.error('Error writing document: ', error);
        // Handle error (e.g., show error message to the user)
      }
    }
  };

  // Navigate to the profile view after submission
  if (isSubmitted) {
    navigate('/viewprofile');
  }

  return (
    <>
      <Navbar />
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3 mt-5">
          <Form.Group as={Col} md="4" controlId="validationFormik101" className="position-relative">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormik102" className="position-relative">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationFormik103" className="position-relative">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationFormik104" className="position-relative">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              isInvalid={!!errors.state}
            />
            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationFormik105" className="position-relative">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zip"
              name="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              isInvalid={!!errors.zip}
            />
            <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="position-relative mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            onChange={handleFileChange}
            isInvalid={!!errors.file}
          />
          <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Create Profile</Button> or 
        <Link to='/viewprofile'>
          <Button type="button">View Profile</Button>
        </Link>
      </Form>
    </>
  );
}

export default Profile;
