import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useFavorites } from "../Components/FavoritesContext";
import "../Styles/index.css";

import { DogCardProps } from "../interfaces";

export default function DogCard({ dog, showButton = true }: DogCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const isFav = favorites.some((favDog) => favDog.id === dog.id);
    setIsFavorited(isFav);
  }, [favorites, dog.id]);

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="bg-white text-[#d77f3b] shadow-md rounded-lg w-44 pb-1 sm:mb-1 sm:w-78 lg:-mb-2 lg:w-55">
      <div className="flex flex-col items-center">
        <div className="bottom-round">
          {showButton && (
            <button
              onClick={toggleFavorite}
              className={`flex justify-end cursor-pointer transition-colors duration-300 ${
                isFavorited
                  ? "text-[#D35400] opacity-100"
                  : "text-[#d77f3b] opacity-100"
              }`}
            >
              <div
                className={`absolute top-2 right-2 flex justify-center items-center w-15 h-15 rounded-full bg-white opacity-60 hover:opacity-80 transition-opacity duration-200 ${
                  isFavorited ? "opacity-80" : "opacity-20"
                } hover:opacity-80`}
              >
                <FaHeart className="z-30" size={29} />
              </div>
            </button>
          )}

          <img
            className="rounded-lg h-70 mr-9 object-cover sm:h-90 sm:w-78 lg:h-56"
            src={dog.img}
            alt={dog.name}
          />
        </div>

        <h3 className="text-xl  text-[#D35400] font-bold mt-2">{dog.name}</h3>
        <p className="  w-40 text-center text-[#d77f3b] text-sm text-ellipsis truncate sm:w-52 ">
          {dog.breed}
        </p>
        <p className=" text-[#d77f3b] text-sm">{dog.age} years old</p>
        <p className=" text-[#d77f3b] text-sm">{dog.zip_code}</p>
      </div>
    </div>
  );
}
