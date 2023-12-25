import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

export default function SetBorn() {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await editAuthor({
        variables: { name, setBornTo: parseInt(born) },
      });
    } catch (error) {
      console.log('Error: ', error);
    }

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
}
