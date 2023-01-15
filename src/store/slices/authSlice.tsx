import { AxiosError, AxiosResponse } from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI } from "../../services/services";
import { LoginDataType } from '../../component/Login';
import { IUser } from '../../types/types';

type AuthStateType = {
  loading: boolean,
  isAuthenticate: boolean | null,
  error: AxiosError | null,
  data: IUser | null
}

const initialState: AuthStateType = {
  loading: false,
  isAuthenticate: localStorage.getItem("auth") !== null || null,
  error: null,
  data: null,
}

const login = createAsyncThunk(
  'auth/login',
  async (data: LoginDataType, thunkApi) => {
    try {
      const response: AxiosResponse = await loginAPI(data);
      return response.data
    } catch (error: any) {
      const errorStatus = {
        statusCode: error.response.code,
        message: error.message,
      }
      return thunkApi.rejectWithValue(errorStatus)
    }
  }
)

const logout = createAsyncThunk(
  'auth/logout',
  async (data, thunkApi) => {
    try {
      const response: AxiosResponse = await logoutAPI();
      localStorage.removeItem("auth");
      return response.data
    } catch (error: any) {
      const errorStatus = {
        statusCode: error.response.code,
        message: error.message,
      }
      return thunkApi.rejectWithValue(errorStatus)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticate = false;
      })
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.isAuthenticate = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
        state.isAuthenticate = null;
      })
  }
})

export { login, logout };
export default authSlice.reducer;