// doctorThunks.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchDoctorAppointments',
  async (id) => {
    console.log(id)
    try {
      const response = await axios.get(`http://localhost:5000/api/users/appointments/${id}`);
      console.log('Fetched appointments:', response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error); // Log the error
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);
