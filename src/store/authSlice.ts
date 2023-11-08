import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { UserType } from "../utils/type";
import { API_ENDPOINT } from "../utils/constants";

const initialState: InitialStateType = {
  user: undefined,
};

export const asyncLoginOAuth = createAsyncThunk(
  "auth/asyncLoginOAuth",
  async () => {
    const res = await fetch(`${API_ENDPOINT}/auth/success`, {
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    }
  }
);

export const asyncLogout = createAsyncThunk("auth/asyncLogout", async () => {
  await fetch(`${API_ENDPOINT}/auth/logout`, { credentials: "include" });
  return undefined;
});

export const asyncLogin = createAsyncThunk(
  "auth/asyncLogin",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log("data", data);
      return data;
    }
  }
);

export const asyncRegister = createAsyncThunk(
  "auth/asyncRegister",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, displayName: email }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("data", data);
        return data;
      }
      toast.success("Register success");
    } catch (error) {
      toast.error("Register failed");
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: InitialStateType, action: PayloadAction<UserType>) => {},
    reset: (state: InitialStateType) => {
      state.user = undefined;
    },
  },
  extraReducers: {
    [asyncLoginOAuth.fulfilled.type]: (state, action) => {
      state.user = action.payload;
    },
    [asyncLogout.fulfilled.type]: (state, action) => {
      state.user = action.payload;
    },
    [asyncLogin.fulfilled.type]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, reset } = AuthSlice.actions;

export default AuthSlice.reducer;

interface InitialStateType {
  user: UserType | undefined;
}
