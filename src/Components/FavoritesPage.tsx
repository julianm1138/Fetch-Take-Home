import { useFavorites } from "./FavoritesContext";
import DogCard from "../SearchPage/DogCard";
import { Dog } from "../interfaces";
import BoneButton from "./BoneButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import apiService from "../services/apiService";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const api = apiService;

  const handleGenerateMatch = async () => {
    const favoriteIds = favorites.map((dog) => dog.id);
    const match = await api.fetchMatch(favoriteIds);

    if (match) {
      console.log(match);
      setMatchedDog(match);
    } else {
      console.log("Error, no match found.");
    }
  };

  const handleRemoveFavorite = (dogId: string) => {
    removeFavorite(dogId);
  };

  return (
    <div className="bg-[#efecec] overflow-x-hidden min-h-screen">
      <div className="flex justify-end mt-10">
        <BoneButton
          text={"Search"}
          onClick={() => navigate("/search")}
          className="scale-65 -mt-4 mr-5 mb-10"
          aria-label="Go back to the search page"
        />
      </div>

      {matchedDog ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-10 text-2xl text-[#D35400] text-center">
            Congratulations, you matched with:
          </h1>
          <DogCard
            key={matchedDog.id}
            dog={matchedDog}
            isFavorited={true}
            onToggleFavorite={handleRemoveFavorite}
            showButton={false}
          />
        </div>
      ) : (
        <>
          <h1 className="flex justify-center items-center text-center mb-10 text-2xl text-[#D35400]">
            Your Favorites
          </h1>

          {favorites.length > 0 ? (
            <>
              <div className="flex justify-center">
                <button
                  onClick={handleGenerateMatch}
                  className="bg-white text-[#D35400] hover:bg-[#D35400] text-3xl mb-20 hover:text-white shadow-md px-14 py-3 rounded-md cursor-pointer"
                >
                  Generate Match!
                </button>
              </div>

              <div className="grid grid-cols-2 place-items-center gap-2 mb-30 lg:grid lg:grid-cols-4 lg:place-items-center">
                {favorites.map((favorite: Dog) => (
                  <DogCard
                    key={favorite.id}
                    dog={favorite}
                    isFavorited={true}
                    onToggleFavorite={handleRemoveFavorite}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center text-center gap-5">
              <p className="text-3xl text-[#D35400]">
                No favorites currently added
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
