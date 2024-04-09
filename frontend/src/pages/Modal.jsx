import React from "react";
import '../components/styles.css';

function Modal({ setOpenModal, book }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className='book-details-item description'>
          <span>{book?.descriptions}</span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
