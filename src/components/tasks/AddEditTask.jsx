import Modal from "../Modal";
import TaskForm from "./TaskForm";

function AddEditTask({ type, openBtn, taskIndex }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="addEditTask">{openBtn}</Modal.Open>
        <Modal.Window name="addEditTask">
          <TaskForm type={type} taskIndex={taskIndex} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddEditTask;
