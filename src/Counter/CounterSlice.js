import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    setMinutes : 0,    
  },
  reducers: {
    increment: (state) => {
    },
    decrement: (state) => {
    },
    setMinutes_Value : (state,action) =>{
      state.setMinutes = localStorage.getItem('Minites');
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setMinutes_Value } = counterSlice.actions

export default counterSlice.reducer