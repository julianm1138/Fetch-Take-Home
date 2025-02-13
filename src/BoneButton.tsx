import "./index.css";
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
  return (
    <button
      type="submit"
      className={`bone hover:scale-80 transition-all duration-200 ease-in-out ${
        className ?? ""
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
