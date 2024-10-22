import { createSlice } from '@reduxjs/toolkit';

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SEARCH_FILTER':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const searchFilter = (filter) => {
//   return {
//     type: 'SEARCH_FILTER',
//     payload: filter,
//   };
// };

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    searchFilter(state, action) {
      return action.payload;
    },
  },
});

export const { searchFilter } = filterSlice.actions;

export default filterSlice.reducer;
