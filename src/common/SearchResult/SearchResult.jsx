import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import db from './db';
import './SearchResult.css'; // Importing SearchResult.css for styling

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    if (query) {
      const results = db.items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      // If no query is provided, display all items
      setSearchResults(db.items);
    }
  }, [location.search]);

  return (
    <div className='search-results'>
      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResult;
