import Header from "./Header";
import Filter from "./Filter";
import Main from "./Main";
import "../Styles/index.css";
import { useState } from "react";

interface FilterState {
  breeds: string[];
  sort: string;
  ageRange: { min: number | null; max: number | null };
  zipcode: string[] | null;
}

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterState>({
    breeds: [],
    sort: "breed:asc",
    ageRange: { min: null, max: null },
    zipcode: null,
  });

  const handleFilterChange = (newFilters: {
    breeds: string[];
    sort: string | null;
    ageRange: { min: number | null; max: number | null };
    zipcode: string[] | null;
  }) => {
    setFilters({
      breeds: newFilters.breeds,
      sort: newFilters.sort || "breed:asc",
      ageRange: newFilters.ageRange,
      zipcode: newFilters.zipcode,
    });
  };

  return (
    <div className="bg-[#efecec] overflow-x-hidden min-h-screen">
      <Header />

      <div className="grid lg:grid-cols-[20%_67%] mt-80 lg:pb-1">
        <div className="lg:block z-50 p-3 -mt-75 w-[100%] overflow-x-hidden overflow-y-hidden lg:-mt-105">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className="-mt-90 lg:w-full lg:mt-5">
          <Main filters={filters} />
        </div>
      </div>
    </div>
  );
}
