import React from "react";
import Modal from "./Modal";
import NewItemForm from "./NewItemForm";

const NewItemModal = ({ closeModal }) => (
  <Modal closeModal={closeModal}>
    <NewItemForm closeModal={closeModal} />
  </Modal>
);

export default NewItemModal;
