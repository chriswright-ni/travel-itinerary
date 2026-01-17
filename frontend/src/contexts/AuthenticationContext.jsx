import { createContext, useContext, useState } from "react";


const AuthenticationContext = createContext()

export const useAuthenticationContext = () => useContext(AuthenticationContext)

export const AuthenticationProvider = ({children}) => {

  const [authenticationDialogOpen, setAuthenticationDialogOpen] = useState(false);
  const [authenticationDialogMode, setAuthenticationDialogMode] = useState("login"); // Login or create (create account) mode

  const [token, setToken] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const value = {
    authenticationDialogOpen,
    setAuthenticationDialogOpen,
    authenticationDialogMode,
    setAuthenticationDialogMode,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn
  }

  return <AuthenticationContext.Provider value = {value}>
    {children}
  </AuthenticationContext.Provider>
}