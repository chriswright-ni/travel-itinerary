
import { useAuthenticationContext } from "../contexts/AuthenticationContext";
import { useItineraryContext } from "../contexts/ItineraryContext";

function useSaveItinerary() {

  const { authenticationDialogOpen, setAuthenticationDialogOpen, isLoggedIn } = useAuthenticationContext();
  const { saveCurrentTrip } = useItineraryContext();

  const saveItinerary = () => {

    console.log("Save itinerary pressed")

    if (isLoggedIn) {
      saveCurrentTrip()
    } else {
      setAuthenticationDialogOpen(true)
    }

    // if (!authenticationDialogOpen) {
    //   setAuthenticationDialogOpen(true)
    // }

  }
  

  return {saveItinerary};
}

export default useSaveItinerary;
