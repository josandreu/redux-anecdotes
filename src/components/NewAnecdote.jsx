import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';

    const response = await anecdoteService.addAnecdote(anecdote);

    console.log('anecdote', response);

    dispatch(newAnecdote(response));
    dispatch(showNotificationWithTimeout(`You added: ${anecdote}`));
  };

  return (
    <form onSubmit={addNote}>
      <input type='text' name='anecdote' id='anecdote' />
      <button>Add</button>
    </form>
  );
};

export default NewAnecdote;
