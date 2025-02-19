import Header from "./Header";
import Filter from "./Filter";
import Main from "./Main";
import "../Styles/index.css";
import { useState } from "react";

export default function SearchPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="bg-[#efecec] overflow-x-hidden min-h-screen">
      <Header />

      <div className="grid grid-cols-1">
        <div className=" p-3">
          <Filter onFilterChange={setFilters} />
        </div>

        <div className=" p-3">
          <Main filters={filters} />
        </div>
      </div>
    </div>
  );
}
