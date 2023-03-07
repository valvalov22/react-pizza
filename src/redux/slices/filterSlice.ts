import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export enum sortProperty {
  RATING_DESC = 'rating',
  TITLE_DESC = 'title',
  PRICE_DESC = 'price',
  RATING_ASC = '-rating',
  TITLE_ASC = '-title',
  PRICE_ASC = '-price'
}

type TSort = {
  name: string;
  sort: sortProperty;
}

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: TSort;
}

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

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer