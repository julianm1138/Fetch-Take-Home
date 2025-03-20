import { OverlayProps } from "../interfaces";

export default function Overlay({ isOpen, onClose, children }: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="flex justify-center fixed inset-0 z-50 sm:w-full sm:h-full sm:overflow-y-auto lg:relative lg:w-full lg:h-full ">
      <div className="flex justify-center items-center w-full sm:h-[120%] sm:w-full">
        <div className="bg-[#efecec] p-10 rounded-md relative sm:h-full w-full h-full">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-[#d35400] text-2xl p-1 lg:hidden"
          >
            x
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
