import { Type } from '@/types/Navbar';
import { Pokemon, PokemonInfo } from '@/types/Pokemon';
import { Response } from '@/types/Response';
import { createSlice } from '@reduxjs/toolkit';

interface PokemonsState{
  data: Response<Pokemon>,
  pokemonInfo: PokemonInfo,
  types: Response<Type>,
  loading: boolean
}

const PokemonsSlice = createSlice({
  name: 'counter',
  initialState: { data: {}, pokemonInfo:{}, types: {}, loading: false } as PokemonsState,
  reducers: {
    increment: (state, action) => {
      state.data = action.payload;
    },
    incrementInfo: (state, action) =>{
      state.pokemonInfo = action.payload;
    },
    incrementTypes: (state, action) =>{
      state.types = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { increment, incrementInfo, incrementTypes, setLoading } = PokemonsSlice.actions;
export default PokemonsSlice.reducer;