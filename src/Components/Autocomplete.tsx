import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { Location } from "../interfaces";

export default function Autocomplete() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length >= 2) {
      const fetchSuggestions = async () => {
        setIsLoading(true);

        const results = await apiService.searchLocation({
          city: inputValue,
          size: 10,
        });
        console.log("results", results);
        setSuggestions(results);
        setIsLoading(false);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (suggestion: Location) => {
    setInputValue(
      `${suggestion.city}, ${suggestion.state}, ${suggestion.zip_code}`
    );

    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter city, state, or ZIP"
      />
      {isLoading && <div>Loading...</div>}

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.zip_code}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.city}, {suggestion.state}, {suggestion.zip_code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
