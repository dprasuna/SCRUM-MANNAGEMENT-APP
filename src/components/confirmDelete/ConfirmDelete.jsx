import Modal from "../Modal";
import ConfirmMessage from "./ConfirmMessage";

function ConfirmDelete({ openBtn, type, title, taskIndex, colIndex }) {
  return (
    <Modal>
      <Modal.Open opens="confirmDelete">{openBtn}</Modal.Open>
      <Modal.Window name="confirmDelete">
        <ConfirmMessage
          type={type}
          title={title}
          taskIndex={taskIndex}
          colIndex={colIndex}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ConfirmDelete;
