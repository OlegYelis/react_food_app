import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { Profile } from "../interfaces/user.interface";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  profile?: Profile;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    removeJwt: (state) => {
      state.jwt = null;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
