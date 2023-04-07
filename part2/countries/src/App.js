import React, { useEffect, useState } from 'react';

import countriesService from './services/coutries';
import Filter from './components/Filter';
import Countriesdisplay from './components/Countriesdisplay';

const App = () => {
  const [country, setCountry] = useState(null);
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    countriesService.getAll().then((initialCoutries) => {
      setCountry(initialCoutries);
    });
  }, []);

  if (!country) {
    return null;
  }

  const filterCountries = (value) => {
    const countries = country.filter(
      (names) => names.name.common.indexOf(value) > -1
    );

    if (countries.length !== 0) {
      return countries;
    }
    return false;
  };

  const resultado = filterCountries(filterInput);

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value);
  };

  return (
    <div>
      <Filter
        filterInput={filterInput}
        handleFilterChange={handleFilterChange}
      />

      {resultado.length === country.length ? (
        <p>Enter a country to search...</p>
      ) : (
        <Countriesdisplay resultado={resultado} />
      )}
    </div>
  );
};
export default App;
