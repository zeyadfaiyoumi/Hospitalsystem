import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء Thunk لجلب البيانات من الـ API
export const fetchPatient = createAsyncThunk(
  "Patient/fetchPatient",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/getPatient"
    );
    return response.data;
  }
);

// إنشاء thunk لحذف المنتج باستخدام createAsyncThunk
export const BanPatient = createAsyncThunk(
  "Patient/BanPatient",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/Ban/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const PatientSlice = createSlice({
  name: "Patient",
  initialState: {
    Patient: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Patient = action.payload;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // حالات حذف المنتج
      .addCase(BanPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(BanPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(BanPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default PatientSlice.reducer;
