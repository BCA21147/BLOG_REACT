import { createSlice } from '@reduxjs/toolkit'

export const counterSlice_1 = createSlice({
  name: 'counter_1',
  initialState: {
    setSecond : 0,    
  },
  reducers: {
    increment: (state) => {
    },
    decrement: (state) => {
    },
    setSecond_Value : (state,action) =>{
      state.setSecond = localStorage.getItem('Second');
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setSecond_Value } = counterSlice_1.actions

export default counterSlice_1.reducer