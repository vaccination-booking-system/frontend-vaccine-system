import React from "react";

/**
 *
 * @param {modalWidth} only accept 2 value : "large" or "medium"
 * @returns
 */

const Modal = ({ children, modalWidth }) => {
  return (
    <div>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-50"></div>
      <div
        className={`fixed top-0 bottom-0 right-0 left-0 ${
          modalWidth === "large" ? "px-[10%]" : modalWidth === "medium" && "px-[25%]"
        }  flex items-center`}
      >
        <div className="bg-white flex-auto rounded-md p-4">{children}</div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  modalWidth: "medium",
};

export default Modal;
