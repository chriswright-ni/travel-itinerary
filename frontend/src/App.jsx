import "./App.css";
import SearchPage from "./pages/SearchPage.jsx";
import ItineraryPage from "./pages/ItineraryPage";
import MapPage from "./pages/MapPage";
import TripSetupPage from "./pages/TripSetupPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { ItineraryProvider } from "./contexts/ItineraryContext";
import { MapProvider } from "./contexts/MapContext";
import theme from "./themes/theme_five.js";
import { ThemeProvider } from "@mui/material/styles";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationSnackbar from "./components/NotificationSnackbar.jsx";
import Box from "@mui/material/Box";

function App() {
  const location = useLocation();
  const showMap = location.pathname === "/map";
  return (
    <div>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <MapProvider>
            {/* MapPage info: To avoid unmounting the map container due to route changes,
            the map is being mounted once on app load, and shall remain mounted at all times.
            It is not tied to a route.  The MapPage is displayed based on the pathname of the route. */}
            <Box
              sx={{
                display: showMap ? "block" : "none",
              }}
            >
              <MapPage />
            </Box>
            <SearchProvider>
              <ItineraryProvider>
                <Routes>
                  <Route path="/" element={<TripSetupPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/itinerary" element={<ItineraryPage />} />
                  <Route path="/map" element={<Box />} />
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
