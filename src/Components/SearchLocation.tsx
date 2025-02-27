// SearchLocation.tsx

import Autocomplete from "react-google-autocomplete";
import apiService from "../services/apiService";

const SearchLocation: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  const handlePlaceSelected = async (place: google.maps.places.PlaceResult) => {
    if (!place.address_components) {
      console.error("No address components found");
      return;
    }

    const cityComponent = place.address_components.find((component) =>
      component.types.includes("locality")
    );
    const stateComponent = place.address_components.find((component) =>
      component.types.includes("administrative_area_level_1")
    );
    const postalCodeComponent = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );

    const city = cityComponent?.long_name || "";
    const state = stateComponent?.short_name || "";
    const postalCode = postalCodeComponent?.long_name || "";

    const params = {
      city: city || undefined,
      states: state ? [state] : undefined,
      postalCode: postalCode || undefined,
    };

    try {
      const results = await apiService.searchLocation(params);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Error searching locations:", error);
    }
  };

  return (
    <Autocomplete
      apiKey={apiKey}
      onPlaceSelected={handlePlaceSelected}
      options={{
        types: ["(regions)"],
        fields: ["address_components", "geometry.location"],
      }}
      placeholder="Enter city or ZIP code"
      className="text-[#D35400] text-md bg-white px-3 rounded-md shadow-md h-14 mb-6"
    />
  );
};

export default SearchLocation;
