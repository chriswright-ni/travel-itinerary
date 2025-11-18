import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";

function LocationSearch() {

  const [searchText, setSearchText] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  // const [options, setOptions] = useState('');

  const options = [
    { label: 'Paris', id: 1 },
    { label: 'Belfast', id: 2 },
  ];

  // Basic debounce functionality for API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchText)
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

 
  return (
    <Autocomplete
      id="auto-complete"
      inputValue={searchText}
      onInputChange={(e, newSearchText) => setSearchText(newSearchText)}
      options={options}
      autoComplete
      includeInputInList
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="standard" />
      )}
    />
  );
}

export default LocationSearch
