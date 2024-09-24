import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء Thunk لجلب الرسائل من الـ API
export const fetchContactMessages = createAsyncThunk(
  "contactMessages/fetchContactMessages",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/admin/getContactMessages"
    );
    return response.data;
  }
);


const contactMessagesSlice = createSlice({
  name: "contactMessages",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchContactMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default contactMessagesSlice.reducer;
