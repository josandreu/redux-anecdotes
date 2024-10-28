import { useSelector } from 'react-redux';
// import { addVote } from '../reducers/anecdoteReducer';
// import { showNotificationWithTimeout } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes.js';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../useNotification';

const Anecdote = ({ anecdote }) => {
  // const dispatch = useDispatch();

  const { showNotification } = useNotification();

  const queryClient = useQueryClient();

  const newAddVoteMutation = useMutation({
    mutationFn: anecdoteService.addVote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
    onError: () => {
      /*
      En lugar de Redux vamos a utilizar useReducer
      */
      // dispatch(showNotificationWithTimeout(`Error submitting vote`));
      showNotification('Error submitting vote', 'error');
    },
  });

  const { content, votes, id } = anecdote;

  const vote = (id) => {
    //dispatch(addVote(id));
    const anecdotes = queryClient.getQueryData(['anecdotes']);

    const anecdoteToChange = anecdotes.find((anecdote) => anecdote.id === id);

    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    newAddVoteMutation.mutate(updatedAnecdote);

    /*
      En lugar de Redux vamos a utilizar useReducer
      */
    // dispatch(
    //   showNotificationWithTimeout(`You voted: ${updatedAnecdote.content}`)
    // );
    showNotification(`You voted: ${updatedAnecdote.content}`);
  };

  return (
    <li>
      {content} has {votes}
      <button onClick={() => vote(id)}>vote</button>
    </li>
  );
};

const Anecdotes = () => {
  /*
  Este reducer ya no lo utilizamos, hacemos uso de React Query
  */
  // const anecdotes = useSelector(({ anecdotes }) => anecdotes);

  // Fetch anecdotes using React Query
  const {
    data: anecdotes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  /* 
  Memoize filtered and sorted anecdotes 
  */
  const filterString = useSelector(({ filter }) => filter);

  /* 
  useMemo: El array se recalcula solo si anecdotes o filterString cambian.
  Memoize filtered and sorted anecdotes
  */
  const filteredOrSortedAnecdotes = useMemo(() => {
    const filtered = filterString
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filterString.toLowerCase())
        )
      : anecdotes;

    // Sort anecdotes by votes
    return filtered.slice().sort((a, b) => b.votes - a.votes);
  }, [anecdotes, filterString]);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error loading anecdotes {error.message}</div>;
  }

  if (!anecdotes || anecdotes.length === 0) {
    return <div>No anecdotes available</div>;
  }

  return (
    <ul>
      {filteredOrSortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </ul>
  );
};

export default Anecdotes;

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
};
