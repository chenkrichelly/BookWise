import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import '../components/styles.css';
import { AiOutlineDelete } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import Modal from './Modal';

const SavedBooks = ({ isLoggedIn }) => {
    const { id } = useParams();
    const [userBooks, setUserBooks] = useState([]);
    const navigate = useNavigate();
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleGoBackClick = () => {
        navigate(-1);
    };

    const handleReadMoreClick = (book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };

    const handleRemoveFromList = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:8080/remove-book/${id}/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setUserBooks(userBooks.filter(book => book.book_id !== bookId));
            } else {
                console.error('Error removing book:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing book:', error);
        }
    };

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user-books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user books');
                }

                const data = await response.json();
                setUserBooks(data);

            } catch (error) {
                console.error('Error fetching user books:', error);
            }
        };

        fetchUserBooks();
    }, [id]);

    const handleLogoutSuccess = () => {
        localStorage.removeItem('accessToken');
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <header>
                        <AppNavbar isLoggedIn={isLoggedIn} userId={id} handleLogoutSuccess={handleLogoutSuccess} />
                        <div className='header-content2 flex flex-c text-left '>
                            <h2 className='header-title text-capitalize'>Welcome to Your List!</h2><br /><br />
                            <p className='header-text fs-18 fw-3'>Here, you can curate your reading selections and revisit them anytime. From classics to newly discovered gems, your list is your personal literary sanctuary. Add, remove, and view your books as you wish.</p>
                        </div>
                    </header>
                    <Container fluid className="card-container">
                        <button type='button' className='flex flex-c back-btn' onClick={handleGoBackClick}>
                            <FaArrowLeft size={22} />
                            <span className='fs-18 fw-6'>Go Back</span>
                        </button>
                        <Row xs={1} sm={2} md={4} className="card-row">
                            {userBooks.map((book) => (
                                <Col key={book.id} className="card-col">
                                    <div className="card">
                                        <figure className="card-image">
                                            <img src={book.images || 'placeholder-image-url'} alt="Book cover" />
                                        </figure>
                                        <div className="card-content">
                                            <h3 className="card-title">{book?.book_title}</h3>
                                            <h5 className="text-muted">{book.author?.join(', ')}</h5>
                                            <div className="card-footer">
                                                <button onClick={() => handleReadMoreClick(book)}>Read More</button>
                                                <button type="submit" className='flex flex-c' onClick={() => handleRemoveFromList(book.book_id)}>
                                                    <AiOutlineDelete className='text-pink' size={32} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    {modalOpen && (
                        <Modal setOpenModal={setModalOpen} book={selectedBook}>
                        </Modal>
                    )}                    
                </>
            ) : (<h1>User is not logged in, can't show list.</h1>)
            }
        </>
    );
};

export default SavedBooks;


