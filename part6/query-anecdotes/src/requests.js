import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((err) => console.log('Deu erro'));

export const createAnecdotes = (newAnecdote) => {
  if (newAnecdote.content.length > 5) {
    axios.post(baseUrl, newAnecdote).then((res) => res.data);
  } else {
    console.log('Não foi possivel tem menos de 5 caracteres.');
  }
};

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
