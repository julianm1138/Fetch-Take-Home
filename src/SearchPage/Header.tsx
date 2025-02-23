import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoneButton from "../BoneButton";
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
      <header className=" flex justify-end pl-6 mt-2 sm:mt-auto lg:mt-16 lg:h-20">
        <BoneButton
          text="Log Out"
          onClick={handleLogout}
          className="scale-65 -mt-4 mr-5"
          aria-label="Log out of your account"
        />
      </header>
    </div>
  );
}
