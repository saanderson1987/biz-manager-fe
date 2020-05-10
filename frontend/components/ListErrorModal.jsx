import React from "react";
import Modal from "./Modal";

const ListErrorModal = ({ closeModal, error }) => (
  <Modal closeModal={closeModal}>
    <div className="warning">
      <div className="warning-text">{error}</div>
      <div className="button-row-single-button">
        <button onClick={closeModal}>Dismiss</button>
      </div>
    </div>
  </Modal>
);

export default ListErrorModal;
