import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [notificationMessage, setNotificacionMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPeaple) => {
      setPersons(initialPeaple);
    });
  }, []);

  // Adicionar novo
  const addNewPerson = (event) => {
    event.preventDefault();
    const newNameC = newName.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
      letra.toUpperCase()
    );
    const names = persons.find((n) => n.name === newNameC);

    if (names) {
      updateItem(newNameC);
    } else {
      const newPerson = {
        name: newNameC,
        number: newNumber,
      };
      personsService
        .create(newPerson)
        .then((returnPeaple) => {
          setPersons(persons.concat(returnPeaple));
          setNewName('');
          setNewNumber('');
          messageResult({ message: 'Add' });
          // console.log(newNameC);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 10000);
          console.log(error.response.data.error);
        });
    }
  };

  // alterar valor numero
  const updateItem = (newNameC) => {
    const msg = window.confirm(
      `${newNameC} is already added to phonebook, replace the old number a new one?`
    );
    if (msg) {
      const names = persons.find((n) => n.name === newNameC);
      const id = names.id;
      const newPerson = {
        name: newNameC,
        number: newNumber,
      };
      personsService
        .update(id, newPerson)
        .then((response) => {
          messageResult({ message: 'Uppdated' });
          setPersons(persons.map((note) => (note.id !== id ? note : response)));
        })
        .catch((error) => {
          setErrorMessage(
            `Information of '${newNameC}' has already been removed from server.`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((n) => n.id !== id));
        });
      setNewName('');
      setNewNumber('');
    }
  };

  // Deletar item
  const deleteItem = (id) => {
    const remove = persons.find((n) => n.id === id);
    const msg = window.confirm(`Delete ${remove.name}?`);

    if (msg) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((peaple) => peaple.id !== id));
        })
        .catch((error) => {
          alert(`the peaple '${remove.name}' was already deleted from server`);

          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // mensagem
  const messageResult = ({ message }) => {
    setNotificacionMessage(`${message} ${newName}.`);

    setTimeout(() => {
      setNotificacionMessage(null);
    }, 5000);
  };

  //Filtro de pessoas
  const contacts = persons;

  const filterItems = (batata) => {
    const teste = contacts.filter(
      (names) => names.name.toLowerCase().indexOf(batata) > -1
    );

    if (teste.length !== 0) {
      return teste;
    }
    return false;
  };

  const mostrar = filterItems(filterInput.toLowerCase());

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={errorMessage} />
      <Filter
        filterInput={filterInput}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons mostrar={mostrar} deleteItem={deleteItem} />
    </>
  );
};

export default App;
