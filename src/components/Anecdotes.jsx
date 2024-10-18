import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
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
  const anecdotes = useSelector((state) => state);

  const anecdotesByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return anecdotesByVotes.map((anecdote) => (
    <Anecdote key={anecdote.id} anecdote={anecdote} />
  ));
};

export default Anecdotes;

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
};
