import "../Styles/index.css";
import { useLocation } from "react-router-dom";
interface BoneButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}
export default function BoneButton({
  text,
  onClick,
  className,
}: BoneButtonProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <button
      type="submit"
      className={`bone flex justify-center items-center hover:scale-68 transition-all duration-200 ease-in-out ${className} ${
        isLoginPage ? "login-bone" : ""
      }`}
      onClick={onClick}
    >
      <div className="c1"></div>
      <div className="c2"></div>
      <div className="c3"></div>
      <div className="c4"></div>
      <div className="b1"></div>
      <div className="b2 text-black">{text}</div>
    </button>
  );
}
