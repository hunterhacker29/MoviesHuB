


// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import ProtectedRoute from '../src/components/ProtectRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Viewprofile from './pages/Viewprofile';
import Signup from './pages/Signup';
import Uploadmovies from './pages/Uploadmovies';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/29062023home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/viewprofile" 
              element={
                <ProtectedRoute>
                  <Viewprofile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/createprofile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/upload" 
              element={
                <ProtectedRoute>
                  <Uploadmovies />
                </ProtectedRoute>
              } 
            />
               <Route 
              path="/signup" 
              element={
                <ProtectedRoute>
                  <Signup/>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
