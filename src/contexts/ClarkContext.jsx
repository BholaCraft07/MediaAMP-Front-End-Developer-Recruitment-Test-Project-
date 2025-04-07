import React, { createContext, useEffect, useState} from "react";
import { useAuth } from "@clerk/clerk-react";

export const ClerkContext = createContext();

export const ClerkContextProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setAuthToken(token);
      console.log("Fetched Token:", token);  
    };
    fetchToken();
  }, []);

  console.log(authToken);
  
  const value = {
    authToken
  };

  return (
    <ClerkContext.Provider value={value}>
      {children}
    </ClerkContext.Provider>
  );
};
