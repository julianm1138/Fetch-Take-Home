import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./App.css";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

export default App;
