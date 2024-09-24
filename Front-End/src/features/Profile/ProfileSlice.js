import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء Thunk لجلب بيانات الملف الشخصي
export const fetchProfile = createAsyncThunk(
  "Profile/fetchProfile",
  async () => {
    const response = await axios.get("http://localhost:5000/api/auth/Profile", {
      withCredentials: true,
    });
    return response.data;
  }
);

// إنشاء Thunk لحظر المستخدم
export const banUser = createAsyncThunk(
  "Profile/banUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/Ban/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "Profile",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(banUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(banUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(banUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
// _____________________________________________
// _____________________________________________
// _____________________________________________
// إضافة editProfile
// في ملف الـ slice
// export const editProfile = createAsyncThunk(
//   "Profile/editProfile",
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         "http://localhost:5000/api/auth/editProfile",
//         profileData,
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: "Profile",
//   initialState: {
//     profile: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProfile.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProfile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.profile = action.payload;
//       })
//       .addCase(fetchProfile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload; // تأكد من عرض الخطأ في الواجهة
//       })
//       .addCase(editProfile.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(editProfile.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.profile = { ...state.profile, ...action.payload };
//       })
//       .addCase(editProfile.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export default profileSlice.reducer;
