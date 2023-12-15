import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((err) => console.error('Erro ao obter anedotas:', err));

export const createAnecdotes = async (newAnecdote) => {
  try {
    if (newAnecdote.content.length > 5) {
      const response = await axios.post(baseUrl, newAnecdote);
      return response.data;
    } else {
      throw new Error('A anecdote must have 5 or more characters.');
    }
  } catch (error) {
    console.error('Erro ao criar anedota:', error.message);
    throw error; // Lança o erro novamente para que o chamador possa lidar com ele
  }
};

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data)
    .catch((err) => console.error('Error updating anedota:', err));
