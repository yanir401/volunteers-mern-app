import React from "react";
import "./modal.css";
const Modal = (props) => {
  if (!props.show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-background">
        <div className="modal-container">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
