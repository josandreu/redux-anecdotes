import { useDispatch } from 'react-redux';
import { searchFilter } from '../reducers/filterReducer';

const SearchFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(searchFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default SearchFilter;
