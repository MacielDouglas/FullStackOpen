import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const novaAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
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
