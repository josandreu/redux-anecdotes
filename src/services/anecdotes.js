import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch anecdotes');
  }
};

const addAnecdote = async (content) => {
  const anecdoteObject = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdoteObject);

  return response.data;
};

const addVote = async (content) => {
  const id = content.id;

  const response = await axios.put(`${baseUrl}/${id}`, content);

  return response.data;
};

export default { getAll, addAnecdote, addVote };
