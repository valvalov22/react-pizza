import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sort: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
        state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
  },
    setSortType(state, action) {
        state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  },
})

export const selectSort = (state) => state.filter.sort;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer