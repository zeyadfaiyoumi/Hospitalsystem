import { createSlice } from '@reduxjs/toolkit';

// Define the initial state and the slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    // Initial state here
  },
  reducers: {
    // Reducer functions here
  },
});

// Export the actions and the reducer
export const { actionName } = userSlice.actions;
export default userSlice.reducer;
