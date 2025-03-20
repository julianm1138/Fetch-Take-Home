import { useEffect, useState } from "react";
import DogCard from "./DogCard";
import Pagination from "./Pagination";
import { Dog, DogSearchParams } from "../interfaces";
import apiService from "../services/apiService";

export default function Main({ filters }: { filters: DogSearchParams }) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    next: string | null;
    prev: string | null;
  }>({
    total: 0,
    next: null,
    prev: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!filters) return;

    const fetchDogs = async () => {
      setIsLoading(true);

      try {
        const searchResponse = await apiService.searchDogs(filters);
        const dogIds = searchResponse.resultIds;
        const dogDetails = await apiService.fetchDogDetails(dogIds);
        setDogs(dogDetails);

        setPagination({
          total: searchResponse.total,
          next: searchResponse.next,
          prev: searchResponse.prev,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDogs();
  }, [filters]);

  const handlePageChange = async (cursor: string | null) => {
    if (!cursor) return;

    setIsLoading(true);
    try {
      const searchResponse = await apiService.fetchDogsByCursor(cursor);
      const dogIds = searchResponse.resultIds;

      const dogDetails = await apiService.fetchDogDetails(dogIds);
      setDogs(dogDetails);

      setPagination({
        total: searchResponse.total,
        next: searchResponse.next,
        prev: searchResponse.prev,
      });

      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching dogs by cursor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {isLoading ? (
        <p className="text-[#D35400] animate-bounce duration-[1s] text-center font-light text-4xl">
          Loading...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 w-full mt-30 justify-center items-center gap-2 px-2 lg:-mt-80 sm:grid-cols-2 sm:gap-7 sm:px-2 lg:grid-cols-4 ">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorited={true}
                onToggleFavorite={() => null}
              />
            ))}
          </div>

          <div className="mt-15 mb-10">
            <Pagination
              total={pagination.total}
              next={pagination.next}
              prev={pagination.prev}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
