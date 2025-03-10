"use client";

import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Close modal when clicking outside of it
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
    <div id="modal-overlay" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-80">
        <button onClick={onClose} className="float-right text-lg">✖</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
