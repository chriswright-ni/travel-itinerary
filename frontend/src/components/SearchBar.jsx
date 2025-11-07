import { SearchBox } from '@mapbox/search-js-react';


const SearchBar = () => {

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;

  return (
    <div>
    <SearchBox
    // ACCESS TOKEN BELOW IS PUBLIC - FOR DEMO PURPOSE ONLY - THIS WILL BE REPLACE BY BACKEND API CALL
      accessToken = {mapboxAccessToken}
      options={{
        language: 'en',
        limit: 10,
        types: "place" // Set search API to return only cities and places, not countries or POIs
      }}
    />
    </div>
  )
}

export default SearchBar;
