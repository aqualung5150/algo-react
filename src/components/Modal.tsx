import CloseSVG from "assets/close-svgrepo-com.svg?react";

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 z-10 flex h-dvh w-dvw items-center justify-center bg-black/70"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="border-grey mx-2 flex h-[500px] w-[400px] flex-col rounded border bg-white shadow-xl"
      >
        <div className="flex items-center justify-end rounded-t border-b p-4 md:p-5">
          {onClose && (
            <CloseSVG onClick={onClose} className="h-12 w-12 cursor-pointer" />
          )}
        </div>

        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
