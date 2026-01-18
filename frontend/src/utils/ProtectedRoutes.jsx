import { Outlet, Navigate } from "react-router-dom"
import { useAuthenticationContext } from "../contexts/AuthenticationContext";

const ProtectedRoutes = () => {

  const {
    isLoggedIn
  } = useAuthenticationContext();


  return isLoggedIn ? <Outlet /> : <Navigate to="/itinerary" />

}

export default ProtectedRoutes