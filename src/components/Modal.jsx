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
    <div className="bg-white  border-gray-300 border-2  p-4 rounded-md shadow-lg relative z-50 w-8/12 h-auto max-h-8/12 overflow-y-auto">
      <button onClick={onClose} className="absolute top-2 right-2 text-lg hover:cursor-pointer">✖</button>
      <div>{children}</div>
    </div>
  </div>
  );
};

export default Modal;
