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
    <div className="bg-[#efecec] overflow-x-hidden min-h-screen ">
      <Header />

      <div className="grid lg:grid-cols-[20%_67%] lg:pb-1">
        <div className="lg:block p-3 -mt-30">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        <div className=" p-3 lg:w-full ">
          <Main filters={filters} />
        </div>
      </div>
    </div>
  );
}
