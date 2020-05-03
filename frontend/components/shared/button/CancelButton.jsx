import React from "react";

const CancelButton = ({ onClick }) => (
  <button className="button--small" onClick={onClick}>
    Cancel
  </button>
);

export default CancelButton;
