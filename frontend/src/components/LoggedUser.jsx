import React, { useState } from 'react';
import SearchBar from './Searchbar';
import Cards from '../components/Cards';
import "./styles.css"

function LoggedUser({ username, userId }) {
  const [searchResults, setSearchResults] = useState(null);
  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <>
    <header>
    <div className='header-content2 flex flex-c text-left '>
        <h2 className='header-title text-capitalize'>Hey, {username}!</h2><br /><br />
          <p className='header-text fs-18 fw-3'>Are you ready to embark on your reading adventure? Explore our library, save your favorite books, or ones you'd like to read. Dive in and discover your next literary obsession!</p>
        <SearchBar onSearchResults={updateSearchResults} />
    </div>        
    <Cards searchResults={searchResults} />
    </header>
    </>
  )
}

export default LoggedUser;