import React, { useState, useEffect } from 'react';
import AppNavbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchResultContext } from '../SearchResultContext';
import { FaArrowLeft } from "react-icons/fa";
import '../components/styles.css';

const BookPage = ({ isLoggedIn }) => {
  const { id } = useParams();
  const { searchResults } = useSearchResultContext();
  const [userId, setUserId] = useState(null);
  const book = searchResults.find((item) => item.id === id);
  const navigate = useNavigate();
  const handleGoBackClick = () => {
    navigate(-1);
  };
  
  const handleLogoutSuccess = () => {
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const fetchUserID = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const userResponse = await fetch('http://localhost:8080/current-user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to get current user');
        }

        const userData = await userResponse.json();
        setUserId(userData.id);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchUserID();
  }, []); 

  if (!book) {
    return <h1>Book not found.</h1>;
  }


  return (
    <>
      {isLoggedIn ? (
        <>
            <header>
              <AppNavbar isLoggedIn={isLoggedIn} userId={userId} handleLogoutSuccess={handleLogoutSuccess} />
              <div className='header-content3 flex flex-c text-left '>
                <h3 className='header-title text-capitalize'>{book.volumeInfo.title}</h3><br /><br />
              </div>
            </header>            
            <section className='book-details'>
              <div className='container'>
                <button type='button' className='flex flex-c back-btn' onClick={handleGoBackClick}>
                  <FaArrowLeft size={22} />
                  <span className='fs-18 fw-6'>Go Back</span>
                </button>
                <div className='book-details-content grid'>
                  <div className='book-details-img'>
                    <img src={book.volumeInfo.imageLinks?.thumbnail || 'placeholder-image-url'} />
                  </div>
                  <div className='book-details-info'>
                    <div className='book-details-item title'>
                      <span className='fw-6 fs-24'>{book.volumeInfo.title}</span>
                    </div>
                    <div className='book-details-item description'>
                      <span>{book.volumeInfo.description}</span>
                    </div>
                    <div className='book-details-item'>
                      <span className='fw-6'>Authors: </span>
                      <span className='text-italic'>{book.volumeInfo.authors?.join(', ') || 'Unknown'}</span>
                    </div>
                    <div className='book-details-item'>
                      <span className='fw-6'>Category: </span>
                      <span className='text-italic'>{book.volumeInfo.categories?.join(', ') || 'Unknown'} </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
      ) : (
      <h1>User is not logged in, can't show book details.</h1>        
      )}
    </>
  )
}

export default BookPage
