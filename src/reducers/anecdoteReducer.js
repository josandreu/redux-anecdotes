import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id;
//       const anecdoteToChange = state.find((n) => n.id === id);
//       const changedAnecdoted = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };

//       return state.map((anecdote) =>
//         anecdote.id === id ? changedAnecdoted : anecdote
//       );
//     }
//     case 'ADD': {
//       return state.concat(action.payload);
//     }
//     default:
//       return state;
//   }
// };

// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id },
//   };
// };

// export const newAnecdote = (content) => {
//   return {
//     type: 'ADD',
//     payload: {
//       content: content,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // updateAnecdotes(state, action) {
    //   const id = action.payload.id;
    //   const changedAnecdoted = action.payload;

    //   return state.map((anecdote) =>
    //     anecdote.id === id ? changedAnecdoted : anecdote
    //   );
    // },
    /*
    Reducer versión mejorada, Redux Toolkit utiliza immer bajo el capó, lo que permite mutaciones "inmutables".
    */
    updateAnecdotes(state, { payload }) {
      const anecdoteIndex = state.findIndex(
        (anecdote) => anecdote.id === payload.id
      );
      if (anecdoteIndex !== -1) {
        state[anecdoteIndex] = payload;
      }
    },
    setAnecdotes(state, { payload }) {
      return payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

/*
Función que crea un reducer para obtener mediante useEffect las anecdotas del servidor en cada renderizado
Mantenemos la función, pero no lo usamos, hacemos lo mismo con React Query
*/
export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

/*
Mantenemos la función, pero no lo usamos, hacemos lo mismo con React Query
*/
export const newAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addAnecdote(content);

    dispatch(appendAnecdote(anecdote));
  };
};

/*
Mantenemos la función, pero no lo usamos, hacemos lo mismo con React Query
*/
export const addVote = (content) => {
  return async (dispatch, getState) => {
    const id = content;
    const { anecdotes } = getState();
    const anecdoteToChange = anecdotes.find((n) => n.id === id);

    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    const response = await anecdoteService.addVote(updatedAnecdote);

    dispatch(updateAnecdotes(response));
  };
};

export const { updateAnecdotes, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
