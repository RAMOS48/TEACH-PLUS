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
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
        <div className="bg-white p-4 rounded-md w-80 shadow-lg relative z-50">
            <button onClick={onClose} className="absolute top-2 right-2 text-lg">✖</button>
            <div>{children}</div>
        </div>
    </div>
  );
};

export default Modal;
