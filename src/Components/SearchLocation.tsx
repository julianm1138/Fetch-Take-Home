import Autocomplete from "react-google-autocomplete";
import apiService from "../services/apiService";
import { useRef } from "react";

interface SearchLocationProps {
  onLocationSelect: (location: {
    city?: string | undefined;
    state?: string | undefined;
    postalCode?: string | undefined;
  }) => Promise<void>;
}

const SearchLocation: React.FC<SearchLocationProps> = ({
  onLocationSelect,
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePlaceSelected = async (place: google.maps.places.PlaceResult) => {
    if (!place.address_components) {
      console.error("No address components found");
      return;
    }

    const getAddressComponent = (type: string) => {
      const component = place.address_components?.find((comp) =>
        comp.types.includes(type)
      );
      return component ? component.long_name : "";
    };

    console.log("Selected Place Data:", place.address_components);

    const city = getAddressComponent("locality");
    const state = getAddressComponent("administrative_area_level_1");
    const postalCode = getAddressComponent("postal_code");

    const locationData = {
      city,
      state,
      postalCode,
    };

    try {
      await onLocationSelect(locationData);
    } catch (error) {
      console.error("Error in onLocationSelect:", error);
    }

    try {
      const params = {
        city: city || undefined,
        states: state ? [state] : undefined,
        postalCode: postalCode || undefined,
      };

      const results = await apiService.searchLocation(params);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Error searching locations:", error);
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Autocomplete
        apiKey={apiKey}
        onPlaceSelected={handlePlaceSelected}
        options={{
          componentRestrictions: { country: "us" },
          fields: ["address_components", "geometry.location"],
        }}
        placeholder="Enter city, state, or ZIP"
        className="text-[#D35400] text-md bg-white px-3 rounded-md shadow-md w-full h-14 mb-6"
        ref={inputRef}
      />
      <button onClick={handleClear}>Clear Input</button>
    </>
  );
};

export default SearchLocation;
