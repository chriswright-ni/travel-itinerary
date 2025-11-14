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
        types: "place, city, district, locality", // Set search API to return only cities and places, not countries or POIs
      }}
      // Res is the user selection from the autocomplete search results
      onRetrieve={(res) => {
        console.log(res)
        const data = res.features[0];
        console.log(data.geometry.coordinates)
        const coordinates = data.geometry.coordinates // Array with latitude (element 2) and longitude (element 1) values

        onLocationSelect(coordinates)
      }} 
    />
    </div>
  )
}

export default SearchBar;
