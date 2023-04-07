import React from 'react';

const Filter = ({ filterInput, handleFilterChange }) => {
  return (
    <div>
      <form>
        <div>
          find countries:
          <input value={filterInput} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
