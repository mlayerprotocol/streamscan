import { AuthModel, Meta, AuthModelData } from "@/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthModel = {
  meta: {} as Meta,
  data: {} as AuthModelData,
  remember_me: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updataAuthData: (state, action: PayloadAction<AuthModel>) => {
      state.meta = action.payload.meta;
      state.data = action.payload.data;
    },
    removeAuthData: (state) => {
      // state = initialState;
      state.meta = initialState.meta;
      state.data = initialState.data;
    },
  },
});

export const { updataAuthData, removeAuthData } = authSlice.actions;

export default authSlice.reducer;
