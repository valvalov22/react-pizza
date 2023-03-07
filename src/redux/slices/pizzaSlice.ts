import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store';


type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

export enum PizzaStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IPizzaSliceState {
  items: TPizza[];
  status: PizzaStatus;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: PizzaStatus.LOADING,
}

export const fetchPizzas = createAsyncThunk<TPizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios
    .get<TPizza[]>(
      `https://63e4c1e08e1ed4ccf6e54873.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
    return data;
  }
)

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

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer