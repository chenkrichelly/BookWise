import { createContext, useContext, useState } from 'react';

const SearchResultContext = createContext();
export const useSearchResultContext = () => {
    return useContext(SearchResultContext);
};

export const SearchResultProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const setResults = (results) => {
        setSearchResults(results);
    };

    return (
        <SearchResultContext.Provider value={{ searchResults, setResults }}>
            {children}
        </SearchResultContext.Provider>
    );
};
