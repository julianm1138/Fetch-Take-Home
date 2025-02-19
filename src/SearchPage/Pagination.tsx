interface PaginationProps {
  //taking data from the server
  total: number;
  next: string | null;
  prev: string | null;
  onPageChange: (cursor: string | null) => void;
}

export default function Pagination({
  //data from the server
  total,
  next,
  prev,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex gap-5 mb-4 justify-between">
        <button
          onClick={() => onPageChange(prev)}
          disabled={!prev}
          className={`px-14 py-3 rounded-md ${
            prev
              ? "bg-white text-[#D35400] shadow-md cursor-pointer"
              : "bg-white text-[#D35400] shadow-md"
          }`}
        >
          Previous
        </button>

        <button
          onClick={() => onPageChange(next)}
          disabled={!next}
          className={`px-14 py-3 rounded-md ${
            next
              ? " bg-white text-[#D35400] shadow-md cursor-pointer"
              : "bg-white text-[#D35400] shadow-md"
          }`}
        >
          Next
        </button>
      </div>

      <p className=" text-[#D35400]">Total Results: {total}</p>
    </div>
  );
}
