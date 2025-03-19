import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoneButton from "../Components/BoneButton";
import "../Styles/index.css";
import "../Styles/bonebutton.css";

export default function Header({ className }: { className?: string }) {
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
      <div className={className}></div>
      <header className=" flex justify-between relative z-20 pl-6 mt-2 sm:mt-auto lg:flex lg:justify-end lg:mt-16 lg:h-20">
        <BoneButton
          text="Favorites"
          onClick={() => navigate("/favorites")}
          className="scale-65 mt-5 lg:-mt-4 mr-5"
          aria-label="Go to your favorites"
        />
        <BoneButton
          text="Log Out"
          onClick={handleLogout}
          className="scale-65 mt-5 lg:-mt-4 mr-5"
          aria-label="Log out of your account"
        />
      </header>
    </div>
  );
}
