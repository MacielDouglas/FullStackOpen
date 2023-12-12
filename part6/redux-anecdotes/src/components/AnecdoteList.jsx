import { useSelector, useDispatch } from 'react-redux';
import { votar } from '../reducers/anecdoteReducer';
// import Filter from './Filter';

export default function AnecdoteList() {
  // const anecdotes = useSelector((state) => state);
  const anecdotes = useSelector((state) => {
    if (state.filter === 'ALL') {
      return state.anecdotes;
    }
    return state.anecdotes.filter((a) => {
      return a.content.toLowerCase().includes(state.filter.toLowerCase());
    });
  });

  const dispatch = useDispatch();

  let vote = (id) => {
    dispatch(votar(id));
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
}
