import React, { useState } from 'react';
import Weather from './Weather';

const Countriesdisplay = ({ resultado }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShow = (name) => {
    const country = resultado.find((n) => n.name.common === name);

    setShowAll({
      name: country.name.common,
      show: true,
      languages: Object.values(country.languages),
    });

    return country.name.common;
  };

  return (
    <div>
      {resultado.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : resultado.length >= 2 ? (
        resultado.map((con) => (
          <pre key={con.name.common}>
            <h3>
              {con.name.common}{' '}
              <button onClick={() => handleShow(con.name.common)}>show</button>
            </h3>
            {con.name.common === showAll.name && showAll.show === true ? (
              <>
                <p>Capital: {con.capital}</p>
                <p>Area: {con.area} km²</p>
                <ul>
                  {showAll.languages.map((ol) => (
                    <li key={ol}>{ol}</li>
                  ))}
                </ul>
                <img src={con.flags.png} alt={`${con.name.common} flag`} />
                <Weather city={con.capital} latlng={con.capitalInfo} />
              </>
            ) : (
              <></>
            )}
          </pre>
        ))
      ) : resultado.length === 1 ? (
        resultado.map((con, i) => (
          <pre key={con.name.common}>
            <h3>{con.name.common} </h3>
            <p>Capital: {con.capital}</p>
            <p>Area: {con.area} km²</p>
            <ul>
              {resultado
                .map((ol) => ol.languages)
                .map((vx) => Object.values(vx))[0]
                .map((oi, i) => (
                  <li key={i}>{oi}</li>
                ))}
            </ul>

            <img src={con.flags.png} alt={`${con.name.common} flag`} />
            <Weather city={con.capital} latlng={con.capitalInfo} />
          </pre>
        ))
      ) : (
        <h4> Not Found</h4>
      )}
    </div>
  );
};

export default Countriesdisplay;
