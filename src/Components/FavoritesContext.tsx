import { useState, createContext, useContext, ReactNode } from "react";
import { Dog } from "../interfaces";

interface FavoritesContextType {
  favorites: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dogId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Dog[]>([]);

  const addFavorite = (dog: Dog) => {
    setFavorites((prevFavorites) => [...prevFavorites, dog]);
  };

  const removeFavorite = (dogId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((dog) => dog.id !== dogId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
