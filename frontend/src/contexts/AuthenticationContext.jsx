import { createContext, useContext, useState } from "react";


const AuthenticationContext = createContext()

export const useAuthenticationContext = () => useContext(AuthenticationContext)

export const AuthenticationProvider = ({children}) => {

  const [authenticationDialogOpen, setAuthenticationDialogOpen] = useState(false);
  const [authenticationDialogMode, setAuthenticationDialogMode] = useState("login"); // Login or create (create account) mode


  const value = {
    authenticationDialogOpen,
    setAuthenticationDialogOpen,
    authenticationDialogMode,
    setAuthenticationDialogMode
  }

  return <AuthenticationContext.Provider value = {value}>
    {children}
  </AuthenticationContext.Provider>
}