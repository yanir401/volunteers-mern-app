import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../../context/modalContext";
import { closeModal } from "../../../store/actions/modalActions";
import "./modal.css";
const Modal = (props) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { closeModal } = useContext(ModalContext);

  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        closeModal();
    };

    document.addEventListener("mousedown", handler);
  }, []);

  if (!props.show) return null;

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <p className="close-modal font-20" onClick={handleCloseModal}>
          X
        </p>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
