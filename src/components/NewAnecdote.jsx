import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdotes.js';
// import { newAnecdote } from '../reducers/anecdoteReducer';
import { showNotificationWithTimeout } from '../reducers/notificationReducer';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch(
        showNotificationWithTimeout(`Error submitting anecdote`, 'error')
      );
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';

    if (anecdote.length < 5) {
      dispatch(
        showNotificationWithTimeout(
          `Content must be at least 5 characters long.`,
          'error'
        )
      );
      return;
    }

    /*
    En lugar del reducer vamos a utilizar React Query
    */
    //dispatch(newAnecdote(anecdote));

    newAnecdoteMutation.mutate(anecdote);

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
