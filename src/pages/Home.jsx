


import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

function Home() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Navbar setSearchResults={setSearchResults} />
      <Card searchResults={searchResults} />
    </div>
  );
}

export default Home;
