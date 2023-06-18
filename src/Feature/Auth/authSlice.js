import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  selectedType: null,
  userToken: null,
  user: null,
  loginString: null,
  verifyString: null,
  userExistStatus: null 
};

// signup user
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {    
    try {
      return authService.signupUser(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// otp verify
export const verifyEmail = createAsyncThunk(
  "auth/verify_email",
  async (data, thunkAPI) => {
    try {
      return authService.verifyEmail(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const defaultType = createAsyncThunk(
  "auth/type",
  async (type, thunkAPI) => {
    try {
      return authService.defaultType(type);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return authService.login(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginToken = createAsyncThunk(
  "auth/loginToken",
  async (data, thunkAPI) => {
    try {
      return authService.loginToken(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      return authService.logOutUser();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/sign-up",
  async (data, thunkAPI) => {
    try {
      return authService.signinUser(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.selectedType = null;
      state.userToken = null;
      state.user = null;
      state.userExistStatus = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.verifyString = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {        
        state.verifyString = action.payload;        
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyString = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loginString = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        if(action.payload.status === 208){
          state.loginString = "false";
          state.userExistStatus = true;
        }else{
          state.userExistStatus = false
        state.loginString = action.payload.data;
        }
      })
      .addCase(signupUser.rejected, (state) => {
        state.loginString = null;
      })
      .addCase(defaultType.fulfilled, (state, action) => {
        state.selectedType = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.selectedType = action.payload;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.selectedType = action.payload;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.selectedType = null;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.selectedType = "accept";
        state.userToken = null;
        state.user = null;
        state.userExistStatus = null  
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.selectedType = null;
      })
      .addCase(loginToken.pending, (state) => {
        state.userToken = null;
      })
      .addCase(loginToken.fulfilled, (state, action) => {
        state.userToken = action.payload;
      })
      .addCase(loginToken.rejected, (state) => {
        state.userToken = null;
      })
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;