import { createContext, useContext, useState } from "react";


const AuthenticationContext = createContext()

export const useAuthenticationContext = () => useContext(AuthenticationContext)

export const AuthenticationProvider = ({children}) => {

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);


  const value = {
    loginDialogOpen,
    setLoginDialogOpen
  }

  return <AuthenticationContext.Provider value = {value}>
    {children}
  </AuthenticationContext.Provider>
}