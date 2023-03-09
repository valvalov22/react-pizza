import { sortProperty, TSort } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterSliceState } from './types';

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sort: sortProperty.RATING_DESC
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
  },
    setSortType(state, action: PayloadAction<TSort>) {
        state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer