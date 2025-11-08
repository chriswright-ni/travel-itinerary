import "./App.css";
import LandingPage from "./pages/LandingPage";
import ItineraryPage from "./pages/ItineraryPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
      </Routes>
    </div>
  );
}

export default App;
