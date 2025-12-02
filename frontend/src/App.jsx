import "./App.css";
import LandingPage from "./pages/LandingPage";
import ItineraryPage from "./pages/ItineraryPage";
import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { ItineraryProvider } from "./contexts/ItineraryContext";
import theme from "./themes/theme.js";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <ItineraryProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
            </Routes>
          </ItineraryProvider>
        </SearchProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
