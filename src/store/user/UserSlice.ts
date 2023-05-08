import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  amount: number;
}

const initialState = {
  amount: 100000,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAmount: (state, action) => {
      state.amount = action.payload;
    },
    increaseAmount(state: StateType, action) {
      const value = action.payload;
      state.amount = state.amount + value;
    },
    decreaseAmount(state: StateType, action) {
      const value = action.payload;
      state.amount = state.amount - value;
    },
  },
});

export const { getAmount, increaseAmount, decreaseAmount } = UserSlice.actions;

export default UserSlice.reducer;
