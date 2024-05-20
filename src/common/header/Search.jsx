import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../components/assets/images/logo.svg';

const Search = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    // Navigate to search results page with query params
    history.push(`/search-results?query=${encodeURIComponent(query)}`);
  };

  return (
    <section className='search'>
      <div className='container c_flex'>
        <div className='logo width '>
          <img src={logo} alt='' />
        </div>

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
          <Link to='/login'>
            {/* Wrap the user icon inside a Link component */}
            <i className='fa fa-user icon-circle'></i>
          </Link>
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
