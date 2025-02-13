import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoneButton from "../BoneButton";
import "../index.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.log("Logout failed.", error);
    }
  };

  return (
    <div>
      <header className="flex justify-end">
        <h1>Welcome to Dog Search!</h1>
        <BoneButton
          text="Log Out"
          onClick={handleLogout}
          className="scale-70"
          aria-label="Log out of your account"
        />
      </header>
    </div>
  );
}
