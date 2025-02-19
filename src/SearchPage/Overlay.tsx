interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Overlay({ isOpen, onClose, children }: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="flex justify-center fixed inset-0 z-50 sm:w-[42rem] sm:h-screen sm:overflow-y-auto">
      <div className="flex justify-center items-center sm:h-full sm:w-full">
        <div className="bg-[#efecec] p-10 rounded-md shadow-md relative sm:h-[30rem] sm:mt-20 w-full h-full">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-[#D35400] text-2xl p-1"
          >
            x
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
