"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { store, useAppDispatch } from "@/redux/app";
import { Provider } from "react-redux";
import { THEME_STORAGE_KEY, Storage, getSessionStorage } from "@/utils";
import { useLazyGetAccountDetailQuery } from "@/redux/apis";
import { updataAuthData } from "@/redux/slices";

interface AppContextValues {
  initialLoading: boolean;
}

export const AppContext = createContext<AppContextValues>({
  initialLoading: false,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const [dataFn, { isLoading }] = useLazyGetAccountDetailQuery();
  const sessionToken = getSessionStorage();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sessionToken) {
      // setAppType(storage.get());
      dataFn()
        .unwrap()
        .then((payload) => {
          dispatch(updataAuthData({ ...payload }));
        });
    }
  }, []);

  useEffect(() => {
    setInitialLoading(isLoading);
  }, [isLoading]);

  return (
    <AppContext.Provider value={{ initialLoading }}>
      {children}
    </AppContext.Provider>
  );
};
