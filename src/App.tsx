import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SearchPage from "./SearchPage/SearchPage";
import FavoritesPage from "./Components/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
