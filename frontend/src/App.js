import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchResultProvider } from './SearchResultContext';
import './index.css';
import Home from "./pages/Home"
import BookPage from './pages/BookPage';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import SavedBooks from "./pages/SavedBooks";

const App= () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };
  
  return (
    <BrowserRouter>
      <SearchResultProvider>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} handleLoginSuccess={handleLoginSuccess} handleLogout={handleLogout} />}/>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLoginSuccess} />} />
          <Route path="/savedbooks/:id" element={<SavedBooks isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />          
        </Routes>
      </SearchResultProvider>
    </BrowserRouter>
  );
}
export default App;
