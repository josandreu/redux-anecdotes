import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';
import Notification from './components/Notification';
import SearchFilter from './components/SearchFilter';

const App = () => {
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
