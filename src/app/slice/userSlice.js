// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../features/auth/authApi";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  username: "Guest",
  currentUser:null,
  isAuthenticated: false,
  role:""
    // State username với giá trị mặc định là "Guest


  // Có thể khai báo nhiều state khác nữa
};

// Cấu hình slice
export const userSlice = createSlice({
  name: "user",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    logout: () => {
      state.currentUser = null;
      state.username = null
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Xử lý logic khi endpoint login được fulfilled
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      // Lưu thông tin user vào state
      state.isAuthenticated = true;
      state.currentUser = action.payload.data;
      state.username = action.payload.data.email,
      state.role = action.payload.data.roles[0].name

    });
    // builder.addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
    //   // Lưu thông tin user vào state
    //   state.isAuthenticated = true;
    //   state.currentUser = action.payload.data;
    //   state.username = action.payload.data.email,
    //   state.role = action.payload.data.roles[0].name

    // });
  },
});

// Export action ra để sử dụng cho tiện.
export const { logout } = userSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateUsername()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectUsername = state => state.user.username;
export const selectToken = state => state.user.currentUser?.accessToken;


// Export reducer để nhúng vào Store
export default userSlice.reducer;