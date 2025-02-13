import Header from "./Header";
import Filter from "./Filter";
import Main from "./Main";

export default function SearchPage() {
  return (
    <div className=" grid grid-cols-1 gap-4 p-4 bg-cover bg-center">
      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-1">
          <Filter />
        </div>

        <div className="col-span-1 sm:col-span-3">
          <Main />
        </div>
      </div>
    </div>
  );
}
