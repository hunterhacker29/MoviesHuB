


// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Card from '../components/Card';

// function Home() {
//   const [searchResults, setSearchResults] = useState([]);

//   return (
//     <div>
//       <Navbar setSearchResults={setSearchResults} />
//       <Card searchResults={searchResults} />
//     </div>
//   );
// }

// export default Home;
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

function Home() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div
      style={{
        backgroundImage: "url('https://repository-images.githubusercontent.com/452334441/b5da6131-e638-4464-9572-310f86f8340f')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <Navbar setSearchResults={setSearchResults} />
      <Card searchResults={searchResults} />
    </div>
  );
}

export default Home;
