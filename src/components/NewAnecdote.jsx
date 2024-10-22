import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(newAnecdote(anecdote));
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
