import React from 'react';
import "../styles/FilterBar.css";

const FilterBar = ({ setFilter }) => {
  const [activeFilter, setActiveFilter] = React.useState('name');

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <div className="filter-bar">
      <button
        className={`filter-button ${activeFilter === 'name' ? 'active' : ''}`}
        onClick={() => handleFilterChange('name')}
      >
        A-Z
      </button>
      <button
        className={`filter-button ${activeFilter === '-name' ? 'active' : ''}`}
        onClick={() => handleFilterChange('-name')}
      >
        Z-A
      </button>
      <button
        className={`filter-button ${activeFilter === '-rating' ? 'active' : ''}`}
        onClick={() => handleFilterChange('-rating')}
      >
        Rating High-Low
      </button>
      <button
        className={`filter-button ${activeFilter === 'rating' ? 'active' : ''}`}
        onClick={() => handleFilterChange('rating')}
      >
        Rating Low-High
      </button>
    </div>
  );
};

export default FilterBar;
