const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_FILTER':
      return action.payload;
    default:
      return state;
  }
};

export const searchFilter = (filter) => {
  return {
    type: 'SEARCH_FILTER',
    payload: filter,
  };
};

export default filterReducer;
