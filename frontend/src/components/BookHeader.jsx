import React from 'react';
import AppNavbar from './Navbar'
import "./styles.css"

function BookHeader() {
  return (
    <>
    <header>
    <AppNavbar />
    <div className='header-content flex flex-c text-left '>
      <h2 className='header-title text-capitalize'>Welcome Book! </h2><br /><br />
      <p className='header-text fs-18 fw-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam beatae sapiente quibusdam consequatur perspiciatis facere laboriosam non nesciunt at id repudiandae, modi iste? Eligendi, rerum!</p>
    </div>
    </header>
    </>
  )
}

export default BookHeader;