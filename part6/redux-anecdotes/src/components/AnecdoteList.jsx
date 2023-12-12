import { useSelector, useDispatch } from 'react-redux';
import { votar } from '../reducers/anecdoteReducer';

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state);
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
