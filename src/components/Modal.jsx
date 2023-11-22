// // Reusable Modal  Component Using Compound Component Pattern
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import crossImage from "../assets/icon-cross.svg";

const ModalContext = createContext();

function Modal({ children, onClose }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (windowName) => setOpenName(windowName);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const closeRef = useOutsideClick(() => {
    if (name === openName) {
      close();
    }
  }, true);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-[#00000080]">
      <div
        className="nested-modal fixed left-[50%] top-[50%] z-50 max-h-[80vh] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-lg bg-contentBgc p-[20px] shadow-md"
        ref={closeRef} // Use the ref here
      >
        <button onClick={close} className="absolute left-[20px] top-[20px]">
          <img src={crossImage} alt="crossImage" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

