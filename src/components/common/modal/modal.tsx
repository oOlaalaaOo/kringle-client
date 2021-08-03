import React, { useEffect, useRef } from "react";

interface IProps {
  show: boolean;
  onClose?: () => void;
}

const Modal: React.FC<IProps> = ({ show, onClose, children }) => {
  const contentRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler, true);

    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
    };
  });

  const outsideClickHandler = (event: MouseEvent) => {
    if (event && event.target) {
      if (
        contentRef &&
        contentRef.current &&
        !contentRef.current.contains(event.target)
      ) {
        console.log("close");
        if (typeof onClose !== "undefined") onClose();
      }
    }
  };

  if (show === false) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0" */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        {/* Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" */}

        <div
          ref={contentRef}
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-4xl"
        >
          <div className="bg-white p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
