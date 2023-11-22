import Modal from "../Modal";
import BoardForm from "./BoardForm";

function AddEditBoard({ type, openBtn }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="addEditBoard">{openBtn}</Modal.Open>
        <Modal.Window name="addEditBoard">
          <BoardForm type={type} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddEditBoard;
