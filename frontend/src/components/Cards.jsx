import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSearchResultContext } from '../SearchResultContext';
import "./styles.css"

const Cards = () => {
    const navigate = useNavigate();
    const { searchResults, setResults } = useSearchResultContext();
    const [savedBooks, setSavedBooks] = useState([]);
    const [userId, setUserId] = useState(null);
    const handleReadMoreClick = (bookId, userId) => {
        navigate(`/book/${bookId}`);
    };

    const handleAddToListClick = async (book) => {
        const authors = book.volumeInfo.authors || ['Unknown'];
        const newSavedBook = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: authors,
            imageLinks: book.volumeInfo.imageLinks.thumbnail || {}, 
            book_id: book.id,
            description: book.volumeInfo.description,
        };

        setSavedBooks((prevSavedBooks) => [...prevSavedBooks, newSavedBook]);
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
            const response = await fetch('http://localhost:8080/save-book', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    book_title: newSavedBook.title,
                    author: newSavedBook.authors,
                    book_id: newSavedBook.id,
                    descriptions: newSavedBook.description,
                    images: newSavedBook.imageLinks
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save book');
            }

            setResults((prevResults) => [...prevResults, newSavedBook]);
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    return (
        <Container fluid className="card-container">
            <Row xs={1} sm={2} md={4} className="card-row">
                {searchResults && searchResults.map((item, index) => (
                    <Col key={index} className="card-col">
                        <div className="card">
                            <figure className="card-image">
                                <img src={item.volumeInfo?.imageLinks?.thumbnail || 'placeholder-image-url'} alt="Book cover" />
                            </figure>
                            <div className="card-content">
                                <h3 className="card-title">{item.volumeInfo?.title}</h3>
                                <h5 className="text-muted">{item.volumeInfo?.authors || ['Unknown']}</h5>
                                <div className="card-footer">
                                    <button onClick={() => handleReadMoreClick(item.id)}>Read More</button>
                                    <button className="icon-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" style={{ cursor: 'pointer' }} id="Heart"
                                            onClick={() => handleAddToListClick(item) }>
                                            <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );         
};

export default Cards;
