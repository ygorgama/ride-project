import React, { createContext, useState, ReactNode } from 'react';
import { RequestDriversInterface } from './interfaces/RequestDriversInterface';

interface AppContextType {
  drivers: RequestDriversInterface | null;
  setDrivers: (driver: RequestDriversInterface) => void;
  custumerId: string,
  setCustumerId: (custumer: string) => void,
  location: {
    origin: string,
    destination: string
  },
  setLocation: (location: {
    origin: string,
    destination: string
  }) => void,
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({children}:  { children: ReactNode }){
    const [drivers, setDrivers] = useState<RequestDriversInterface | null>(null);
    const [custumerId, setCustumerId] = useState<string>("");
    const [location, setLocation] = useState<{ 
      origin: string,
      destination: string
    }>({
      origin: "",
      destination: "",
    });

    return (
        <AppContext.Provider value={{ drivers, setDrivers, custumerId, setCustumerId, location, setLocation}}>
          {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };