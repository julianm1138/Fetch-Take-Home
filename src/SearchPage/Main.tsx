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

interface DogSearchParams {
  breeds?: string[];
  zipcode?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
  from?: string;
}

export default function Main({ filters }: { filters: DogSearchParams }) {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    if (!filters) return;

    const params: DogSearchParams = {};

    if (filters.breeds && filters.breeds.length > 0)
      params.breeds = filters.breeds;

    if (filters.zipcode) {
      params.zipcode = filters.zipcode;
    }

    if (filters.ageMin !== null) params.ageMin = filters.ageMin;

    if (filters.ageMax !== null) params.ageMax = filters.ageMax;

    if (filters.sort) params.sort = `${filters.sort}`;

    console.log("Filters", filters);

    axios
      .get("https://frontend-take-home-service.fetch.com/dogs/search", {
        params,
        withCredentials: true,
      })
      .then(async (res) => {
        const dogIds: string[] = res.data.resultIds;

        const dogDetailsRes = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          dogIds,
          { withCredentials: true }
        );
        console.log("server data:", dogDetailsRes.data);
        setDogs(dogDetailsRes.data);

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

    const decodedUrl = decodeURIComponent(cursor);

    axios
      .get(`https://frontend-take-home-service.fetch.com${decodedUrl}`, {
        withCredentials: true,
      })

      .then(async (res) => {
        const dogIds: string[] = res.data.resultIds;

        const dogDetailRes = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          dogIds,
          { withCredentials: true }
        );

        setDogs(dogDetailRes.data);
        setPagination({
          total: res.data.total,
          next: res.data.next,
          prev: res.data.prev,
        });
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="grid grid-cols-2 w-full justify-center ml-4 mr-15 sm:grid-cols-2 sm:ml-8 sm:mr-25 lg:grid-cols-3 gap-13 sm:gap-19 px-4 sm:px-10">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
      <div>
        <Pagination
          total={pagination.total}
          next={pagination.next}
          prev={pagination.prev}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
