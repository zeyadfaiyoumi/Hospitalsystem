import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء Thunk لجلب البيانات من الـ API
export const fetchAdmin = createAsyncThunk("Admin/fetchAdmin", async () => {
  const response = await axios.get("http://localhost:5000/api/admin/getAdmin", {
    withCredentials: true,
  });
  return response.data;
});

const AdminSlice = createSlice({
  name: "Admin",
  initialState: {
    Admin: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Admin = action.payload;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AdminSlice.reducer;
