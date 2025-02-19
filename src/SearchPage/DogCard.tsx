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
    <div className="bg-white text-[#d77f3b] shadow-md rounded-lg pb-5 w-44 sm:w-78">
      <div className="flex flex-col items-center">
        <div className="bottom-round">
          <button
            onClick={toggleFavorite}
            className={`flex justify-end cursor-pointer transition-colors duration-300 ${
              isFavorited ? "text-red-500" : "text-[#D35400]"
            }`}
          >
            <div className="absolute top-2 right-2 flex justify-center items-center w-15 h-15 rounded-full bg-white opacity-60">
              <FaHeart className=" z-30  " size={29} />
            </div>
          </button>

          <img
            className=" rounded-lg h-70 mr-9 object-cover sm:h-90 sm:w-78 lg:h-56"
            src={dog.img}
            alt={dog.name}
          />
        </div>

        <h3 className="text-lg  text-[#D35400] font-bold mt-2">{dog.name}</h3>
        <p className="  w-40 text-center text-[#C02C2C] text-sm *:truncate sm:w-52 ">
          {dog.breed}
        </p>
        <p className=" text-[#C02C2C] text-sm">{dog.age} years old</p>
        <p className=" text-[#C02C2C] text-sm">{dog.zip_code}</p>
      </div>
    </div>
  );
}
