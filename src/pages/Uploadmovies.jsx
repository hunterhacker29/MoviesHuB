


import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase/Firebase'; // Adjust this import based on your Firebase setup
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from '../components/Navbar';

function Uploadmovies() {
  const [moviename, setMoviename] = useState('');
  const [rating, setRating] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isUploading, startTime]);

  const handleMovieNameChange = (e) => {
    setMoviename(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleVideoChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const sanitizeMovieName = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, '_');
  };

  const uploadFile = (file, path) => {
    return new Promise((resolve, reject) => {
      const fileRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!moviename || !rating || !video || !thumbnail) {
      alert('Please fill out all fields and upload both a video and a thumbnail.');
      return;
    }

    setIsUploading(true);
    setStartTime(Date.now());

    try {
      const sanitizedMovieName = sanitizeMovieName(moviename);
      const timestamp = Date.now().toString();

      const videoURL = await uploadFile(video, `movies/${sanitizedMovieName}_${timestamp}_video`);
      const thumbnailURL = await uploadFile(thumbnail, `movies/${sanitizedMovieName}_${timestamp}_thumbnail`);

      await setDoc(doc(db, `home/movie/movies/${sanitizedMovieName}_${timestamp}`), {
        moviename: moviename,
        rating: rating,
        videoURL: videoURL,
        thumbnailURL: thumbnailURL,
        uploadDate: new Date().toISOString()
      });

      console.log('Movie uploaded successfully:', { moviename, rating, videoURL, thumbnailURL });
      setIsUploading(false);
      setUploadProgress(0);
      alert('Movie uploaded successfully!');
    } catch (error) {
      console.error('Error uploading movie:', error);
      setIsUploading(false);
      alert('Error uploading movie. Please try again.');
    }
  };

  const calculateTimeRemaining = () => {
    if (uploadProgress > 0) {
      const timePerPercent = timeElapsed / uploadProgress;
      const timeRemaining = timePerPercent * (100 - uploadProgress);
      return formatTime(timeRemaining / 1000); // converting milliseconds to seconds
    }
    return 'Calculating...';
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <Navbar/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <label htmlFor="moviename" className="form-label">Movie Name</label>
          <input
            type="text"
            className="form-control"
            id="moviename"
            value={moviename}
            onChange={handleMovieNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnailFile" className="form-label">Upload Thumbnail</label>
          <input
            className="form-control"
            type="file"
            id="thumbnailFile"
            onChange={handleThumbnailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="videoFile" className="form-label">Upload Video</label>
          <input
            className="form-control"
            type="file"
            id="videoFile"
            onChange={handleVideoChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {isUploading && (
        <div style={{ width: 100, height: 100, margin: '20px auto' }}>
          <CircularProgressbar
            value={uploadProgress}
            text={`${Math.round(uploadProgress)}%`}
            styles={buildStyles({
              textColor: '#000',
              pathColor: '#007bff',
              trailColor: '#d6d6d6',
            })}
          />
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            Estimated time remaining: {calculateTimeRemaining()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Uploadmovies;
