import DogCard from "./DogCard";
import Pagination from "./Pagination";
export default function Main({ className }: { className?: string }) {
  return (
    <div className="flex flex-col justify-between mt-10">
      <DogCard />
      <Pagination />
    </div>
  );
}
