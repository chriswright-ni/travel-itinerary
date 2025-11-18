import { SearchBox } from '@mapbox/search-js-react';


const SearchBar = ({onLocationSelect}) => {

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;

  return (
    <div>
    <SearchBox
    // ACCESS TOKEN BELOW IS PUBLIC - FOR DEMO PURPOSE ONLY - THIS WILL BE REPLACE BY BACKEND API CALL
      accessToken = {mapboxAccessToken}
      options={{
        language: 'en',
        limit: 10,
        types: "place, city, district, locality, region", // Set search API to return only cities and places, not countries or POIs
      }}
      // Res is the user selection from the autocomplete search results
      onRetrieve={(res) => {
        const data = res.features[0];
        const coordinates = data.geometry.coordinates // Array with latitude (element 2) and longitude (element 1) values
        const locationName = data.properties.full_address // Array with latitude (element 2) and longitude (element 1) values

        onLocationSelect(coordinates, locationName)
      }}

      
      // onSuggest is the list of autocomplete suggestions the user sees when typing
      // Using onSuggest to filter out airport names
      // onSuggest={(res) => {
      //   console.log(res)
      //   const suggestions = res.suggestions;
      //   console.log(suggestions)
      //   const suggestionsFiltered = suggestions.filter((location) => !location.name.toLowerCase().includes('airport'));
      //   res.suggestions = suggestionsFiltered
      //   console.log(res.suggestions)
      // }}
      // onSuggest={(res) => {
      //   console.log(res)
      //   const suggestions = res.suggestions;
      //   console.log(suggestions)
      //   const suggestionsFiltered = suggestions.filter((location) => !location.name.toLowerCase().includes('airport'));
      //   res.suggestions = suggestionsFiltered
      //   console.log(res.suggestions)
      //   res.suggestions.splice(0, 10)
      //   console.log(res.suggestions)
    />
    </div>
  )
}

export default SearchBar;
