import React, { createContext, ReactNode, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppProps {
  children: ReactNode;
}

interface FormData {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface IStore {
  getItem: () => Promise<FormData[]>;
  setItem: (formData: FormData) => Promise<void>;
}

const AppContext = createContext({} as IStore);

const AppProvider = ({ children }: AppProps) => {
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const storageKey = '@passmanager:logins';

  const getItem = async () => {
    try {
      const response = await AsyncStorage.getItem(storageKey);

      const formattedResponse = response ? JSON.parse(response!) : [];

      return formattedResponse;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const setItem = async (formData: FormData) => {
    try {
      const storagedData = await AsyncStorage.getItem(storageKey);

      const parsedData = storagedData ? JSON.parse(storagedData!) : [];
      const dataFormatted = [...parsedData, formData];

      await AsyncStorage.setItem(storageKey, JSON.stringify(dataFormatted));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        getItem,
        setItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useStorageData = () => useContext(AppContext);

export { AppProvider, useStorageData };
