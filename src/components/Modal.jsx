"use client";

import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "modal-overlay") {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <div
    id="modal-overlay"
    className="fixed inset-0 flex items-center justify-center bg-opacity-00 z-50"
  >
    <div className="bg-white  border-gray-300 border-2  p-4 rounded-md shadow-lg relative z-50 sm:w-full  lg:w-9/12 sm:h-auto h-auto max-h-10/12 overflow-y-auto">
    <div className="sticky top-0 right-0 z-50 flex justify-end p-2 ">
  <button onClick={onClose} className="text-lg hover:cursor-pointer text-white bg-[#2e398e] px-2 rounded-md">✖</button>
</div>      <div>{children}</div>
    </div>
  </div>
  );
};

export default Modal;
