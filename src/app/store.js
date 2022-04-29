import { configureStore } from '@reduxjs/toolkit'
import paginateSlice from '../slice/paginateSlice'

export const store = configureStore({
  reducer: {
      page:paginateSlice
  },
})