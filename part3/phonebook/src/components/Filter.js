import React from 'react';

const Filter = ({ filterInput, handleFilterChange }) => {
  return (
    <div>
      <form>
        <div>
          filter shown with:
          <input value={filterInput} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
