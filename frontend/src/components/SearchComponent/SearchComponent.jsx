// SearchComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchComponent.css';
import { TextField } from '@mui/material';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/search/?q=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    };

    if (query) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (type, slug, productId, brandSlug) => {
    if (type === 'product') {
      navigate(`/products/${slug}/${productId}`);
    } else if (type === 'brand') {
      navigate(`/brands/${slug}`);
    }

    setQuery('');
  };

  return (
    <div style={{ position: 'relative' }}>

        <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full  rounded-lg'
        id="outlined-basic"
        label="Поиск 🔎"
        variant="outlined"
        />

      {query && (
        <button
          className="absolute inset-y-1.5 h-[70%] rounded-lg right-2 px-4 bg-[#028103] text-white"
          onClick={() => {
            // Apply the search or any other action
            console.log('Apply button clicked!');
          }}
        >
          Найти
        </button>
      )}

      <ul className="absolute h-auto bg-white z-1 left-0 right-0 rounded-md ">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            className="pt-2 px-3 mb-2 flex items-center cursor-pointer"
            onClick={() =>
              handleSelect(suggestion.type, suggestion.slug, suggestion.id, suggestion.brand_slug)
            }
          >
            <img
              src={`http://127.0.0.1:8000/${suggestion.image}`}
              alt={suggestion.name}
              className="w-9 h-12 mr-2"
            />
            {suggestion.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
