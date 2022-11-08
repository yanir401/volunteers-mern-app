import React from "react";
import "./modal.css";
const Modal = (props) => {
  if (!props.show) return null;

  const closeModal = () => props.closeModal(false);
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="close-modal font-20" onClick={closeModal}>
          X
        </p>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
