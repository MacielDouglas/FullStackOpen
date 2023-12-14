import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    updateAnecdoteMutation.mutate(updatedAnecdote);
    console.log('vote');
  };

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 2,
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const anecdotes = result.data;
  console.log('carreguei');
  console.log(anecdotes);

  return (
    <div>
      {anecdotes ? (
        <>
          <h3>Anecdote app</h3>

          <Notification />
          <AnecdoteForm />

          {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>anecdote service not available due to problems in server</div>
      )}
    </div>
  );
};

export default App;
