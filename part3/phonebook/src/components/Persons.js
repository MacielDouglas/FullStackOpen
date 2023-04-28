import React from 'react';

const Persons = ({ mostrar, deleteItem }) => {
  // console.log(mostrar);
  return (
    <div>
      {mostrar ? (
        mostrar.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => deleteItem(person.id)} value={person.id}>
              delete
            </button>
          </p>
        ))
      ) : (
        <h4>Not found</h4>
      )}
    </div>
  );
};

export default Persons;
