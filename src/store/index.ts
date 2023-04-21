import { configureStore } from '@reduxjs/toolkit';
import PokemonsSlice from "./pokemons";

const store = configureStore({
  reducer: {
    pokemons: PokemonsSlice
  }
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;