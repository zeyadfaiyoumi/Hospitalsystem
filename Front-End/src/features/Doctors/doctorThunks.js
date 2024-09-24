import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Create async thunk for fetching doctors
export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const response = await axios.get('http://localhost:5000/api/users/doctors');
  return response.data; // Return the data to be used in the fulfilled case
});

// Create async thunk for fetching a doctor by ID
export const fetchDoctorById = createAsyncThunk('doctors/fetchDoctorById', async (id) => {
  const response = await axios.get(`http://localhost:5000/api/users/doctor/${id}`);
  return response.data; // Return the doctor data
});

