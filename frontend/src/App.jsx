import "./App.css";
import LandingPage from "./pages/LandingPage";
import ItineraryPage from "./pages/ItineraryPage";
import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  return (
    <div>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </SearchProvider>
    </div>
  );
}

export default App;
