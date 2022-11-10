import { createContext, useEffect, useRef, useState } from "react";
import Modal from "../components/UIElements/modal/Modal";

export const ModalContext = createContext({
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
  closeModalTimeOut: () => {},
});

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState();

  const openModal = (content) => {
    setContent(content);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const closeModalTimeOut = (timeout) => {
    setTimeout(() => {
      setShowModal(false);
    }, timeout);
  };

  const modal = (content) => <Modal>{content}</Modal>;

  const value = { showModal, openModal, closeModal, closeModalTimeOut };

  return (
    <ModalContext.Provider value={value}>
      <Modal show={showModal}>{content}</Modal>

      {children}
    </ModalContext.Provider>
  );
};
