
import { useAuthenticationContext } from "../contexts/AuthenticationContext";

function useSaveItinerary() {

  const { loginDialogOpen, setLoginDialogOpen } = useAuthenticationContext();

  const saveItinerary = () => {

    console.log("Save itinerary pressed")

    if (!loginDialogOpen) {
      setLoginDialogOpen(true)
    }

  }
  

  return {saveItinerary};
}

export default useSaveItinerary;
