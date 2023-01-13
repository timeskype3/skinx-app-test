import { AxiosError, AxiosResponse } from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginAPI } from "../../services/services";
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
  isAuthenticate: localStorage.getItem('token') !== null ? true : null,
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
  }
})

export { login };
export default authSlice.reducer;