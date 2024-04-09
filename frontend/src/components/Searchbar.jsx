import React, { useState } from 'react';
import { useSearchResultContext } from '../SearchResultContext';
import { FaSearch } from "react-icons/fa";
import './styles.css';

const SearchBar = () => {
    const { setResults } = useSearchResultContext();
    const [query, setQuery] = useState('');
    const handleSearch = async () => {
        try {
            const response = await fetch('http://localhost:8080/books/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.items || []);
            } else {
                console.error('Error:', response.statusText);
            }

        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className='search-form'>
            <div className='search-form-elem flex flex-sb bg-white'>
                <input
                    type="text"
                    className='form-control'
                    placeholder="The Overnight Guest..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className='flex flex-c' onClick={handleSearch}>
                    <FaSearch className='text-pink' size={32} />
                </button>
            </div>
        </div>
    )
};

export default SearchBar;
