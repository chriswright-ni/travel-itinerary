
import { useAuthenticationContext } from "../contexts/AuthenticationContext";

function useSaveItinerary() {

  const { authenticationDialogOpen, setAuthenticationDialogOpen } = useAuthenticationContext();

  const saveItinerary = () => {

    console.log("Save itinerary pressed")

    if (!authenticationDialogOpen) {
      setAuthenticationDialogOpen(true)
    }

  }
  

  return {saveItinerary};
}

export default useSaveItinerary;
