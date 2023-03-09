import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPizzas } from './asyncActions';
import { IPizzaSliceState, PizzaStatus, TPizza } from './types';


const initialState: IPizzaSliceState = {
  items: [],
  status: PizzaStatus.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizza[]>) {
        state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = PizzaStatus.LOADING;
      state.items = [];
    })
    .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<TPizza[]>) => {
      state.items = action.payload;
      state.status = PizzaStatus.SUCCESS;
    })
    .addCase(fetchPizzas.rejected, (state) => {
      state.status = PizzaStatus.ERROR;
      state.items = [];
    })
    }
})



export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer