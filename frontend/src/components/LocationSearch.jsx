import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";

function LocationSearch({onLocationSelect}) {

  const [searchText, setSearchText] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [options, setOptions] = useState([]); // MUI options require an array
  const [userSelection, setUserSelection] = useState('');

  // const options = [
  //   { label: 'Paris', id: 1 },
  //   { label: 'Belfast', id: 2 },
  // ];

  // Basic debounce functionality for when searchText changes
  // debouncedQuery gets set 500ms after the user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchText)
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  // This useEffect calls the API whenevr debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery) {
      console.log(`API called for ${debouncedQuery}`)

      const fetchData = async () => {

        const response = await fetch(
          `http://127.0.0.1:5000/api/location/suggest?q=${debouncedQuery}`
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
      id="auto-complete"
      value={userSelection}
      inputValue={searchText} // The value currently in the search box, not the selected value
      onInputChange={(e, newSearchText, reason) => {
        if (reason === 'input') {
          setSearchText(newSearchText);
        }
      }}
      onChange={(e, userSelection) => {
        if (userSelection) {
          setUserSelection(userSelection);
          onLocationSelect(userSelection);
        } else {
          setSearchText('');
        }
      }}
      options={options}
      autoComplete
      includeInputInList
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="standard" />
      )}
      getOptionLabel={(option) => `${option.place_name} (${option.place_formatted})`}
    />
  );
}

export default LocationSearch
