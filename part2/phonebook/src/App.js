import React, { useState } from 'react';
// import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  // const [persons, setPersons] = useState([]);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();
    const id = persons.map((id) => id.id).pop();

    const name = persons.map((person) => person.name);
    if (name.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      return;
    } else {
      const newPerson = {
        id: id + 1,
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  //Filtro de pessoas
  const people = persons.map((person) => person.name.toLowerCase());

  const filterItems = (batata) => {
    const valor = people.filter((names) => names.indexOf(batata) > -1);
    if (valor.length !== 0) {
      return valor;
    }
    return 'Nome não encontrado';
  };
  console.log(filterItems(filterInput.toLowerCase()));

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with:
          <input value={filterInput} onChange={handleFilterChange} />
          <div>Filter: {filterInput}</div>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
      {/* <Filter /> */}
      <PersonForm />
      <Persons />
    </>
  );
};

export default App;
