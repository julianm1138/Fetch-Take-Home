import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Login";
import SearchPage from "./SearchPage/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
