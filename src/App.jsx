// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';
import Notification from './components/Notification';
import SearchFilter from './components/SearchFilter';
// import { initAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(initAnecdotes());
  // }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <SearchFilter />
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  );
};

export default App;
