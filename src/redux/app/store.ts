//
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { unAuthBaseApi, authBaseApi, authApi } from "../apis";
import { authSlice } from "../slices";
// import logger from "redux-logger";

const rootReducer = combineReducers({
  [unAuthBaseApi.reducerPath]: unAuthBaseApi.reducer,
  [authBaseApi.reducerPath]: authBaseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend([
      unAuthBaseApi.middleware,
      authBaseApi.middleware,
      authApi.middleware,
    ]),
  // .concat(logger as any),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
