import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const novaAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(createAnecdote(newAnecdote.content));
    dispatch(showNotification(`You added "${content}"!`));
    setTimeout(() => {
      dispatch(showNotification(''));
    }, 5000);
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
