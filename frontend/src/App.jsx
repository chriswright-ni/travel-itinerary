import "./App.css";
import SearchPage from "./pages/SearchPage.jsx";
import ItineraryPage from "./pages/ItineraryPage";
import MapPage from "./pages/MapPage";
import TripSetupPage from "./pages/TripSetupPage";
import { Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { ItineraryProvider } from "./contexts/ItineraryContext";
import { MapProvider } from "./contexts/MapContext";
import theme from "./themes/theme_five.js";
import { ThemeProvider } from "@mui/material/styles";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationSnackbar from "./components/NotificationSnackbar.jsx";

function App() {
  return (
    <div>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <MapProvider>
            <SearchProvider>
              <ItineraryProvider>
                <Routes>
                  <Route path="/" element={<TripSetupPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/itinerary" element={<ItineraryPage />} />
                  <Route path="/map" element={<MapPage />} />
                </Routes>
              </ItineraryProvider>
            </SearchProvider>
          </MapProvider>
        </ThemeProvider>
        <NotificationSnackbar />
      </NotificationProvider>
    </div>
  );
}

export default App;
