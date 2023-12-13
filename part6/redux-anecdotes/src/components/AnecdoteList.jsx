import { useSelector, useDispatch } from 'react-redux';
import { votar } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    if (state.filter === 'ALL') {
      return state.anecdotes;
    }
    return state.anecdotes.filter((a) => {
      return a.content.toLowerCase().includes(state.filter.toLowerCase());
    });
  });

  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(votar(id));
    dispatch(showNotification(`You voted for "${content}" !`));
    setTimeout(() => {
      dispatch(showNotification(''));
    }, 5000);
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
