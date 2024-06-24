import React, { useState, useEffect } from 'react';
import "./Search.css";

const SearchBar = ({ fetchSuggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      fetchSuggestions(query).then((results) => setSuggestions(results));
    } else {
      setSuggestions([]);
    }
  }, [query, fetchSuggestions]);

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="検索"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onMouseDown={() => setQuery(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
