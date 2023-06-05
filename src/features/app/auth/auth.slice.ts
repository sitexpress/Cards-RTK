import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  AuthApi,
  LoginArgsType,
  RegisterArgsType,
  UserType,
} from "@/features/app/auth/auth.api"

const register = createAsyncThunk("auth/register", (arg: RegisterArgsType) => {
  AuthApi.register(arg)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
})

const login = createAsyncThunk(
  "auth/login",
  async (arg: LoginArgsType, thunkAPI) => {
    try {
      const res = await AuthApi.login(arg)
      console.log(res)
      thunkAPI.dispatch(slice.actions.setUser({ user: res.data }))
    } catch (e) {
      console.log(e)
    }
  },
)

const slice = createSlice({
  name: "auth",
  initialState: { user: null as UserType | null },
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserType }>) => {
      state.user = action.payload.user
    },
  },
})

export const authReducer = slice.reducer
export const authThunks = { register, login }
