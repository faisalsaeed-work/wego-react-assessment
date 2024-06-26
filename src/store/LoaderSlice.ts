import { createSlice } from '@reduxjs/toolkit'

export interface LoaderState {
  isLoading: boolean
}

const initialState: LoaderState = {
    isLoading: false,
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
        state.isLoading = false;
      },
  },
})

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } = loaderSlice.actions

export default loaderSlice.reducer