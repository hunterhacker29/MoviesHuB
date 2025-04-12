


// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase/Firebase';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import '../Styles/card.css';

// function Card({ searchResults }) {
//   const [movies, setMovies] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const moviesQuery = query(
//           collection(db, 'home/movie/movies'),
//           orderBy('uploadDate', 'desc')
//         );
//         const querySnapshot = await getDocs(moviesQuery);
//         const moviesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setMovies(moviesData);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     if (searchResults.length === 0) {
//       fetchMovies();
//     } else {
//       setMovies(searchResults);
//     }
//   }, [searchResults]);

//   const handleCardClick = (videoURL) => {
//     setSelectedVideo(videoURL);
//   };

//   return (
//     <div className="container">
//       {movies.map((movie) => (
//         <div className="movie-card" key={movie.id} onClick={() => handleCardClick(movie.videoURL)}>
//           <img src={movie.thumbnailURL} alt={movie.moviename} className="movie-thumbnail" />
//           <div className="movie-details">
//             <h2 className="movie-name">{movie.moviename}</h2>
//             <p className="movie-rating">Rating: {movie.rating}</p>
//             <p className="upload-date">Upload Date: {new Date(movie.uploadDate).toLocaleDateString()}</p>
//           </div>
//         </div>
//       ))}

//       {/* Video Player Modal */}
//       {selectedVideo && (
//         <div className="video-modal" onClick={() => setSelectedVideo(null)}>
//           <video className="video-player" controls autoPlay>
//             <source src={selectedVideo} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button className="close-button" onClick={() => setSelectedVideo(null)}>X</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Card;
import React, { useEffect, useState } from "react";
import { db } from "../firebase/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "../Styles/card.css";

function Card({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesQuery = query(
          collection(db, "home/movie/movies"),
          orderBy("uploadDate", "desc")
        );
        const querySnapshot = await getDocs(moviesQuery);
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (searchResults.length === 0) {
      fetchMovies();
    } else {
      setMovies(searchResults);
    }
  }, [searchResults]);

  const handleCardClick = (videoURL) => {
    setSelectedVideo(videoURL);
    setIsLoading(true);

    // Auto Rotate for Mobile Users
    if (navigator.userAgent.match(/Android|iPhone|iPad/i)) {
      if (window.screen && window.screen.orientation) {
        window.screen.orientation.lock("landscape").catch(() => {
          console.log("Auto-rotate not supported");
        });
      }
    }
  };

  return (
    <div className="container">
      {movies.map((movie) => (
        <div
          className="movie-card"
          key={movie.id}
          onClick={() => handleCardClick(movie.videoURL)}
        >
          <img
            src={movie.thumbnailURL}
            alt={movie.moviename}
            className="movie-thumbnail"
          />
          <div className="movie-details">
            <h2 className="movie-name">{movie.moviename}</h2>
            <p className="movie-rating">Rating: {movie.rating}</p>
            <p className="upload-date">
              Upload Date: {new Date(movie.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          {isLoading && <div className="loading-buffer">Loading...</div>}
          <video
            src={selectedVideo}
            controls
            autoPlay
            onLoadedData={() => setIsLoading(false)}
            className="video-player"
          />
        </div>
      )}
    </div>
  );
}

export default Card;
