import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(newAnecdote(anecdote));
  };

  return (
    <form onSubmit={addNote}>
      <input type='text' name='anecdote' id='anecdote' />
      <button>Add</button>
    </form>
  );
};

export default NewAnecdote;
