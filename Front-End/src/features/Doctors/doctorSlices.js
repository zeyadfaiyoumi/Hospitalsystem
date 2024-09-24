// import { createSlice } from '@reduxjs/toolkit';
// import { fetchDoctors, fetchDoctorById } from './doctorThunks'; // Adjust the import path as necessary

// const doctorSlice = createSlice({
//   name: 'doctors',
//   initialState: {
//     doctors: [],
//     selectedDoctor: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {}, // No regular reducers needed since all logic is in extraReducers
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDoctors.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchDoctors.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.doctors = action.payload;
//       })
//       .addCase(fetchDoctors.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchDoctorById.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchDoctorById.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.selectedDoctor = action.payload; // Assuming payload contains the selected doctor
//       })
//       .addCase(fetchDoctorById.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default doctorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctors, fetchDoctorById } from "./doctorThunks"; // Adjust the import path as necessary

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
    selectedDoctor: null,
    status: "idle",
    error: null,
  },
  reducers: {}, // No regular reducers needed since all logic is in extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDoctorById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedDoctor = action.payload; // Assuming payload contains the selected doctor
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default doctorSlice.reducer;
