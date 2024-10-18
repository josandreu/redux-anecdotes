import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { useMemo } from 'react';
import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const { content, votes, id } = anecdote;

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <li>
      {content} has {votes}
      <button onClick={() => vote(id)}>vote</button>
    </li>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);

  const filterString = useSelector(({ filter }) => filter);

  // if (filterString.length > 0) {
  //   const filteredAnecdotes = anecdotes.filter((anecdote) =>
  //     anecdote.content.toLowerCase().includes(filterString.toLowerCase())
  //   );

  //   return filteredAnecdotes.map((anecdote) => (
  //     <Anecdote key={anecdote.id} anecdote={anecdote} />
  //   ));
  // }

  // const anecdotesByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  // return (
  //   <ul>
  //     {anecdotesByVotes.map((anecdote) => (
  //       <Anecdote key={anecdote.id} anecdote={anecdote} />
  //     ))}
  //   </ul>
  // );

  // useMemo: El array se recalcula solo si anecdotes o filterString cambian.
  const filteredOrSortedAnecdotes = useMemo(() => {
    const filtered = filterString
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filterString.toLowerCase())
        )
      : [...anecdotes];

    return filtered.sort((a, b) => b.votes - a.votes);
  }, [anecdotes, filterString]);

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
