import "./App.css";
import SearchPage from "./pages/SearchPage.jsx";
import ItineraryPage from "./pages/ItineraryPage";
import TripSetupPage from "./pages/TripSetupPage";
import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { ItineraryProvider } from "./contexts/ItineraryContext";
import theme from "./themes/theme_five.js";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <ItineraryProvider>
            <Routes>
              <Route path="/" element={<TripSetupPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
            </Routes>
          </ItineraryProvider>
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
