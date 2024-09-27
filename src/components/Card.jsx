


import React, { useEffect, useState } from 'react';
import { db } from '../firebase/Firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import '../Styles/card.css';

function Card({ searchResults }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesQuery = query(
          collection(db, 'home/movie/movies'),
          orderBy('uploadDate', 'desc')
        );
        const querySnapshot = await getDocs(moviesQuery);
        const moviesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (searchResults.length === 0) {
      fetchMovies();
    } else {
      setMovies(searchResults);
    }
  }, [searchResults]);

  const handleCardClick = (videoURL) => {
    const videoWindow = window.open();
    videoWindow.document.write(`<video controls autoplay src="${videoURL}" style="width:100%; height:100%;"></video>`);
  };

  return (
    <div className="container">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id} onClick={() => handleCardClick(movie.videoURL)}>
          <img src={movie.thumbnailURL} alt={movie.moviename} className="movie-thumbnail" />
          <div className="movie-details">
            <h2 className="movie-name">{movie.moviename}</h2>
            <p className="movie-rating">Rating: {movie.rating}</p>
            <p className="upload-date">Upload Date: {new Date(movie.uploadDate).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
