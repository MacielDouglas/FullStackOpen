import { useMutation, useQueryClient } from 'react-query';
import { createAnecdotes } from '../requests';
import { useNotificationDispatch } from '../NotesContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const createAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
    onError: () => {
      const errorMessage = 'A anecdote must have 5 or more characters.';
      dispatch({ type: 'ERROR', payload: errorMessage });
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT' });
      }, 5000);
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    createAnecdoteMutation.mutate({ content, votes: 0 });

    if (!createAnecdoteMutation.isError) {
      const successMessage = content;
      dispatch({ type: 'CREATE', payload: successMessage });
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT' });
      }, 5000);
    }

    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
