import { TCartItem } from './types';
import { getCartFromLS } from './../../../utils/getCartFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartSliceState } from './types';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';

const { items, totalPrice } = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice,
  items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
        const findItem = state.items.find(obj => obj.id === action.payload.id);
        if (findItem) {
            findItem.count++;
        } else {
            state.items.push({
                ...action.payload,
                count: 1,
            });
        }

        state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
        const findItem = state.items.find(obj => obj.id === action.payload);

        if (findItem) {
            findItem.count--;
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
            return (obj.price * obj.count) + sum;
        }, 0)
    },
    removeItem(state, action: PayloadAction<string>) {
        state.items = state.items.filter(obj => obj.id !== action.payload);

        state.totalPrice = state.items.reduce((sum, obj) => {
            return (obj.price * obj.count) + sum;
        }, 0)
    },
    clearItems(state) {
        state.items = [];
        state.totalPrice = 0;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer