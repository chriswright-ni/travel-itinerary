import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

function LocationSearch({ onLocationSelect, placeholderText }) {
  const [searchText, setSearchText] = useState(""); // The text entered by the user
  const [debouncedQuery, setDebouncedQuery] = useState(""); // The text sent to the API after the user stops typing
  const [options, setOptions] = useState([]); // The user options returned from the API.  Note: MUI options require an array.
  const [userSelection, setUserSelection] = useState(""); // The option selected by the user

  // Basic debounce functionality for when searchText changes
  // debouncedQuery gets set 500ms after the user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchText);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  // This useEffect calls the API whenever debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery) {
      console.log(`API called for ${debouncedQuery}`);

      // API disabled for the purpose of reducing API calls during development of other functionality
      console.log("Reenable API call for search results");
      const fetchData = async () => {

        const response = await fetch(
          `http://127.0.0.1:5000/api/location/suggest?q=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json(); // Array of objects
        console.log("Inside suggest API call");
        console.log(data);
        setOptions(data);
      }
      fetchData();
    }
  }, [debouncedQuery]);

  return (
    <Autocomplete
      filterOptions={(options) => options} // This line disables MUI's built in filter.  Without this line, multi word searches will return valid API data but won't render to the UI.
      // id="auto-complete1"
      value={userSelection} // The value selected by the user from the search results
      inputValue={searchText} // The value currently in the search box, not the selected value
      onInputChange={(e, newSearchText, reason) => {
        // This will only change the searchText due to user input
        // If the text clears by pressing the X button or deleting all text, it will not change the searchText meaning there won't be another API call
        if (reason === "input") {
          setSearchText(newSearchText);
        }
      }}
      onChange={(e, userSelection) => {
        // Triggers when the user selects an option from the search results
        if (userSelection) {
          console.log("user selection: ", userSelection)
          setUserSelection(userSelection);
          onLocationSelect(userSelection); // Calls handleLocationSelect in Landing Page
          // FIX: The below code is causing the API to call twice (once for the initial search results, and again when the user selects an option)
          // setSearchText(userSelection.place_name); // Updates the searchText to the user selection - this is to prevent the search showing incomplete names
        } else {
          setSearchText(""); // Clears the text when the X button is pressed
        }
      }}
      options={options} // The search results displayed in the dropdown
      autoComplete
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholderText}
          variant="outlined"
          sx={{
            borderRadius: 5,
            backgroundColor: "background.default",
            // boxShadow: 1,
            '& fieldset': {
              border: 'none', 
            },
          }}
        />
      )}
      getOptionLabel={(option) =>
        `${option.place_name} (${option.place_formatted})`
      } // Format of search results
    />
  );
}

export default LocationSearch;
