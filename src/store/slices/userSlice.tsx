import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse, AxiosError } from 'axios'
import { getProfileAPI } from '../../services/services';
import { IUser } from '../../types/types'

type userStateType = {
  loading: boolean,
  error: AxiosError | null,
  data: IUser | null;
}

const initialState: userStateType = {
  loading: false,
  error: null,
  data: null,
}

const getProfile = createAsyncThunk(
  'user/me',
  async (data, thunkApi) => {
    try {
      const response: AxiosResponse = await getProfileAPI();
      return response.data;
    } catch (error: any) {
      const errorStatus = {
        statusCode: error.response.code,
        message: error.message,
      }
      return thunkApi.rejectWithValue(errorStatus);
    }
  }
)

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const {
  updateUser
} = UserSlice.actions;
export { getProfile };
export default UserSlice.reducer;