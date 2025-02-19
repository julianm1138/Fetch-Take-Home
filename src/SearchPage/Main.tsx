import { useEffect, useState } from "react";
import DogCard from "./DogCard";
import Pagination from "./Pagination";
import axios from "axios";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Filters {
  breeds?: string[];
  zipcodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}
export default function Main({ filters }: { filters: Filters }) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    axios
      .get("https://frontend-take-home-service.fetch.com/dogs/search", {
        params: filters,
        withCredentials: true,
      })
      .then(async (res) => {
        const dogIds: string[] = res.data.resultIds;

        // Fetch full details of each dog
        const dogDetailsRes = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          dogIds,
          { withCredentials: true }
        );

        setDogs(dogDetailsRes.data); // Now this contains full dog objects

        setPagination({
          total: res.data.total,
          next: res.data.next,
          prev: res.data.prev,
        });
      })
      .catch((err) => console.log(err));
  }, [filters]);

  const handlePageChange = (cursor: string | null) => {
    if (!cursor) return;
    axios
      .get(`https://frontend-take-home-service.fetch.com/dogs/search`, {
        withCredentials: true,
      })

      .then((res) => {
        setDogs(res.data.resultIds);
        setPagination({
          total: res.data.total,
          next: res.data.next,
          prev: res.data.prev,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="grid grid-cols-2 w-full justify-center ml-3 mr-14 sm:grid-cols-2 sm:ml-9 lg:grid-cols-3 gap-14 sm:gap-12 px-4 sm:px-10">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
      <div>
        <Pagination {...pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
