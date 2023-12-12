import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const novaAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={novaAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
