import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../components/assets/images/logo.svg';

const Search = () => {
  const [query, setQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const history = useHistory();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (isLoggedIn && storedUsername) {
      setLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleSearch = () => {
    history.push(`/search-results?query=${encodeURIComponent(query)}`);
  };

  return (
    <section className='search'>
      <div className='container c_flex'>
        <div className='search-box f_flex'>
          <i className='fa fa-search'></i>
          <input
            type='text'
            placeholder='Search and hit enter...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <span>All Category</span>
        </div>
        <div className='icon f_flex width'>
          {loggedIn ? (
            <div className='profile-icon'>
              {username.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Link to='/login'>
              <i className='fa fa-user icon-circle'></i>
            </Link>
          )}
          <div className='cart'>
            <Link to='/cart'>
              <i className='fa fa-shopping-bag icon-circle'></i>
              <span>0</span> {/* Set initial value to 0 */}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
