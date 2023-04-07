import React from 'react';

const Countriesdisplay = ({ resultado }) => {
  return (
    <div>
      {resultado.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : resultado.length >= 2 ? (
        resultado.map((con) => (
          <pre key={con.name.common}>
            <h3>{con.name.common}</h3>
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
          </pre>
        ))
      ) : (
        <h4> Not Found</h4>
      )}
    </div>
  );
};

export default Countriesdisplay;
