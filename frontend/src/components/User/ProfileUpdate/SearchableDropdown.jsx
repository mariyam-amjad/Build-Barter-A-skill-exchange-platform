import React, { useEffect, useState, useRef } from 'react';

function SearchableDropdown({ options, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = options.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
    setShowOptions(true);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setShowOptions(false);
    setSearchTerm('');
  };

  const handleFocus = () => {
    setShowOptions(true);
    setFilteredOptions(options);
  };

  return (
    <div
      className="searchable-dropdown"
      ref={dropdownRef}
      style={{ position: 'relative', width: '250px' }}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder="Search to add more ..."
        autoComplete="off"
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul
          className="options-list"
          style={{
            position: 'absolute',
            zIndex: 1000,
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginTop: '2px',
            paddingLeft: 0,
            listStyleType: 'none',
          }}
        >
          {filteredOptions.map((option) => (
            <li
              key={option._id || option.name}
              onClick={() => handleSelect(option)}
              className="option-item"
              style={{ padding: '8px', cursor: 'pointer', userSelect: 'none' }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchableDropdown;
