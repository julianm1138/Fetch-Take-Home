import Autocomplete from "react-google-autocomplete";
export default function SearchLocation() {
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  return (
    <Autocomplete
      className="text-blue-600"
      apiKey={apiKey}
      placeholder="Enter city, state, or ZIP"
    />
  );
}
