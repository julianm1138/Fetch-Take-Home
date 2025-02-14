import Header from "./Header";
import Filter from "./Filter";
import Main from "./Main";
import "../Styles/index.css";
import DogCard from "./DogCard";

export default function SearchPage() {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <Header />

      <div className="grid grid-cols-[30%_70%] gap-10">
        <div className=" p-4">
          <Filter />
        </div>

        <div className=" p-4">
          <Main />
        </div>
      </div>
    </div>
  );
}
