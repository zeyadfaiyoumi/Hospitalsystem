import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء Thunk لجلب البيانات من الـ API
export const fetchDoctor = createAsyncThunk("Doctor/fetchDoctor", async () => {
  const response = await axios.get("http://localhost:5000/api/admin/getDoctor");
  return response.data;
});

// إنشاء thunk لحذف المنتج باستخدام createAsyncThunk
export const BanDoctor = createAsyncThunk(
  "Doctor/BanDoctor",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/Ban/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const DoctorSlice = createSlice({
  name: "Doctor",
  initialState: {
    Doctor: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Doctor = action.payload;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // حالات حذف المنتج
      .addCase(BanDoctor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(BanDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(BanDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default DoctorSlice.reducer;
