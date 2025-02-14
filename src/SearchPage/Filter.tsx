import { useState } from "react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Filter({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${className}`}>
      <button
        className="flex justify-start items-center bg-amber-500 text-white px-4 py-2 rounded-lg shadow-md sm:hidden scale-70"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter />
        <span>Filters</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      <div
        className={`mt-4 space-y-4 ${
          isOpen ? "block" : "hidden"
        } sm:block sm:border-r sm:pr-4`}
      >
        <div>
          <label className="block text-gray-700 font-semibold">Breed</label>
          <select className="w-full border p-2 rounded-md">
            <option>All Breeds</option>
            <option>Labrador</option>
            <option>Beagle</option>
            <option>Golden Retriever</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-md">
            A → Z
          </button>
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-md">
            Z → A
          </button>
        </div>

        <button className="w-full bg-gray-300 py-2 rounded-md mt-2">
          Reset Filters
        </button>
      </div>
    </div>
  );
}
