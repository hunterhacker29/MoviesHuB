// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import { db } from '../firebase/Firebase'; // Adjust the path based on your Firebase setup
// import { doc, getDoc } from 'firebase/firestore';
// import { auth } from '../firebase/Firebase'; // Import Firebase auth
// import '../Styles/style.css'

// function Viewprofile() {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch profile data on component mount
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         // Firebase Auth listener
//         const unsubscribe = auth.onAuthStateChanged(async (user) => {
//           if (user) {
//             const userEmail = user.email; // Get user's email
            
//             const docRef = doc(db, 'profiles', userEmail);
//             const docSnap = await getDoc(docRef);
            
//             if (docSnap.exists()) {
//               setProfileData(docSnap.data());
//             } else {
//               console.log('No such document!');
//             }
//           } else {
//             console.log('User not logged in.');
//           }

//           setLoading(false); // Set loading to false after fetching data
//         });

//         return () => unsubscribe(); // Clean up Firebase Auth listener
//       } catch (error) {
//         console.error('Error fetching document: ', error);
//         // Handle error (e.g., show error message to the user)
//         setLoading(false); // Ensure loading state is set to false on error
//       }
//     };

//     fetchProfileData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="profile-container">
//         <div className="profile-picture">
//           <img src={profileData?.fileURL || "default-profile-picture.jpg"} alt="Profile Picture" />
//         </div>
//         <div className="profile-info">
//           <h1>{profileData?.fname} {profileData?.lname}</h1>
//           <p>Email: {profileData?.email}</p>
//           <p>City: {profileData?.city}</p>
//           <p>State: {profileData?.state}</p>
//           <p>Zip: {profileData?.zip}</p>
//           {/* Add additional fields as needed */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Viewprofile;


import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { db } from '../firebase/Firebase'; // Adjust the path based on your Firebase setup
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase/Firebase'; // Import Firebase auth
import '../Styles/style.css';

function Viewprofile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userEmail = user.email;
          console.log('Fetching data for user:', userEmail);
          const docRef = doc(db, 'profiles', userEmail);

          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log('Document data:', docSnap.data());
              setProfileData(docSnap.data());
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching document: ', error);
          }
        } else {
          console.log('User not logged in.');
        }

        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-picture">
          <img src={profileData?.fileURL || "default-profile-picture.jpg"} alt="Profile Picture" />
        </div>
        <div className="profile-info">
          <h1>{profileData?.fname} {profileData?.lname}</h1>
          <p>Email: {profileData?.email}</p>
          <p>City: {profileData?.city}</p>
          <p>State: {profileData?.state}</p>
          <p>Zip: {profileData?.zip}</p>
          {/* Add additional fields as needed */}
        </div>
      </div>
    </>
  );
}

export default Viewprofile;
