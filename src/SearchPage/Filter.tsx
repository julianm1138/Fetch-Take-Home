import { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { MdFilterList } from "react-icons/md";
import apiService from "../services/apiService";
import { FilterState, FilterProps } from "../interfaces";

export default function Filter({ onFilterChange }: FilterProps) {
  const [breeds, setBreeds] = useState<string[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    selectedBreed: "",
    ageMin: null,
    ageMax: null,
    sort: "",
    zipcode: "",
  });

  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  const toggleOverlay = () => setIsOverlayOpen((prev) => !prev);

  useEffect(() => {
    const showFilterOnLargeScreens = () => {
      if (window.innerWidth >= 1024) {
        setIsOverlayOpen(true);
      }

      window.addEventListener("resize", showFilterOnLargeScreens);

      return () =>
        window.removeEventListener("resize", showFilterOnLargeScreens);
    };
    showFilterOnLargeScreens();

    const fetchBreeds = async () => {
      try {
        const fetchBreeds = await apiService.fetchBreeds();
        setBreeds(fetchBreeds);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBreeds();
  }, []);

  const applyFilters = () => {
    if (!onFilterChange) {
      console.error("function not provided");
      return;
    }

    onFilterChange({
      breeds: filters.selectedBreed ? [filters.selectedBreed] : [],
      sort: filters.sort ? `breed:${filters.sort}` : "breed:asc",
      ageRange: { min: filters.ageMin, max: filters.ageMax },
      zipcode: filters.zipcode ? [filters.zipcode] : null,
    });

    if (innerWidth < 1024) toggleOverlay();
  };

  const resetFilters = () => {
    setFilters({
      selectedBreed: "",
      ageMin: null,
      ageMax: null,
      sort: "",
      zipcode: "",
    });
  };

  return (
    <div className="relative flex justify-center ">
      <button
        onClick={toggleOverlay}
        className="flex justify-center items-center gap-3 bg-white text-[#D35400] p-3 w-[40%] rounded-md shadow-md lg:hidden cursor-pointer"
      >
        <MdFilterList size={24} /> Filters
      </button>
      <div className={`lg:block ${isOverlayOpen ? "block" : "hidden"}`}>
        <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
          <label className="flex justify-center text-[#D35400] font-semibold mb-2 ">
            Breed
          </label>
          <select
            className="bg-white w-full h-14 p-3 rounded-md mb-5 text-sm text-[#D35400] shadow-md cursor-pointer"
            value={filters.selectedBreed}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, selectedBreed: e.target.value }))
            }
          >
            <option value="">See All Breeds</option>
            {breeds.map((breed) => (
              <option className="text-[#D35400]" key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>

          <label className="flex justify-center text-[#D35400] font-semibold mb-2">
            Zip Code
          </label>
          <input
            id="zipcode"
            type="text"
            className="border p-3 rounded-md bg-white w-full text-lg sm:h-10"
            value={filters.zipcode}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, zipcode: e.target.value }))
            }
          />

          <label className="flex justify-center text-[#D35400] font-semibold mb-2">
            Age Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.ageMin || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  ageMin: Number(e.target.value),
                }))
              }
              placeholder="Min Age"
              className="w-24 p-2 border rounded-md"
            />
            <input
              type="number"
              value={filters.ageMax || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  ageMax: Number(e.target.value),
                }))
              }
              placeholder="Max Age"
              className="w-24 p-2 border rounded-md "
            />
          </div>

          <div className="flex gap-2 h-12 mb-2">
            <button
              className="flex-1 flex items-center justify-center bg-white text-[#D35400] py-2 rounded-md tex-center text-sm shadow-md cursor-pointer"
              onClick={() => setFilters((prev) => ({ ...prev, sort: "asc" }))}
            >
              Sort A → Z
            </button>
            <button
              className="flex-1 flex items-center justify-center bg-white text-[#D35400] py-2 rounded-md text-sm shadow-md cursor-pointer"
              onClick={() => setFilters((prev) => ({ ...prev, sort: "desc" }))}
            >
              Sort Z → A
            </button>
          </div>

          <button
            className="flex items-center justify-center w-full h-12 bg-white text-[#D35400] py-2 rounded-md mt-2 text-sm shadow-md cursor-pointer"
            onClick={resetFilters}
          >
            Reset
          </button>
          <button
            className="flex items-center justify-center w-full h-12 bg-white text-[#D35400] py-2 rounded-md mt-2 text-sm shadow-md cursor-pointer"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </Overlay>
      </div>
    </div>
  );
}
