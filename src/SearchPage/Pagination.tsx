interface PaginationProps {
  //taking data from the server
  total: number;
  next: string | null;
  prev: string | null;
  onPageChange: (cursor: string | null) => void;
}

export default function Pagination({
  total,
  next,
  prev,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => onPageChange(prev)}
        disabled={!prev}
        className={`px-4 py-2 rounded-md ${
          prev ? "bg-blue-500 text-white cursor-pointer" : "bg-gray-300"
        }`}
      >
        Previous
      </button>

      <p className="text-gray-600">Total Results: {total}</p>
      <button
        onClick={() => onPageChange(next)}
        disabled={!next}
        className={`px-4 py-2 rounded-md ${
          next ? "bg-blue-500 text-white cursor-pointer" : "bg-gray-300"
        }`}
      >
        Next
      </button>
    </div>
  );
}
