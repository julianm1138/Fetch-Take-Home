import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import "../Styles/index.css";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function DogCard({ dog }: { dog: Dog }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="bg-white text-[#d77f3b] shadow-md max-h-100 rounded-lg w-44 sm:w-75">
      <div className="flex flex-col items-center">
        <div className="dog-card">
          <img
            className="w-full h-66 sm:h-52 sm:w-76 lg:h-56 object-cover circle-border"
            src={dog.img}
            alt={dog.name}
          />
        </div>

        <h3 className="text-lg text-[#D35400] font-bold mt-2">{dog.name}</h3>
        <p className=" w-40 text-center text-[#D35400] truncate sm:w-60 ">
          {dog.breed}
        </p>
        <p className=" text-[#D35400] ">{dog.age} years old</p>

        <button
          onClick={toggleFavorite}
          className={`flex justify-end w-8 h-8 mt-2 cursor-pointer transition-colors duration-300 ${
            isFavorited ? "text-red-500" : "text-gray-400"
          }`}
        >
          <FaHeart size={20} />
        </button>
      </div>
    </div>
  );
}
