import React from 'react';

const Persons = ({ mostrar }) => {
  return (
    <div>
      {mostrar ? (
        mostrar.map((person, i) => (
          <p key={i}>
            {person.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
              letra.toUpperCase()
            )}
          </p>
        ))
      ) : (
        <h4>Not found</h4>
      )}
    </div>
  );
};

export default Persons;
