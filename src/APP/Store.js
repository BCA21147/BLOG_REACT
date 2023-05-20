import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../Counter/CounterSlice'
import counterSlice_1 from '../Counter/CounterSlice_1'

export const store = configureStore({
  reducer: {
    counter : counterSlice,
    counter_1 : counterSlice_1,
  }
})