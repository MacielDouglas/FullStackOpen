import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch } from './NotesContext';

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

    updateAnecdoteMutation.mutate(updatedAnecdote);
    dispatch({ type: 'VOTE', payload: anecdote.content });
    setTimeout(() => {
      dispatch({ type: 'TIMEOUT' });
    }, 5000);
  };

  const renderLoadingError = () => {
    if (result.isLoading) {
      return <div>Loading data...</div>;
    }

    if (result.isError) {
      return (
        <div>anecdote service not available due to problems in server</div>
      );
    }

    return null;
  };

  const renderAnecdotes = () => (
    <>
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
  );

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 2,
  });

  const anecdotes = result.data || [];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {renderLoadingError()}
      {renderAnecdotes()}
    </div>
  );
};

export default App;
