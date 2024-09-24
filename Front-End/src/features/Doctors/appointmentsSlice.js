// appointmentsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchDoctorAppointments } from './doctorThunksA';

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetAppointments(state) {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export const { resetAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
