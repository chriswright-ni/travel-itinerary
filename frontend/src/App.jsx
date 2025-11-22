import "./App.css";
import LandingPage from "./pages/LandingPage";
import ItineraryPage from "./pages/ItineraryPage";
import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { ItineraryProvider } from "./contexts/ItineraryContext";

function App() {
  return (
    <div>
      <SearchProvider>
        <ItineraryProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
          </Routes>
        </ItineraryProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
