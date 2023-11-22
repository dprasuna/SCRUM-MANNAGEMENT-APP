import Modal from "../Modal";
import TaskLayout from "./TaskLayout";

function ShowTask({
  openBtn,
  type,
  task,
  subtasks,
  completed,
  taskIndex,
  colIndex,
  columns,
}) {
  return (
    <Modal>
      <Modal.Open opens="showTask">{openBtn}</Modal.Open>
      <Modal.Window name="showTask">
        <TaskLayout
          type={type}
          task={task}
          subtasks={subtasks}
          completed={completed}
          taskIndex={taskIndex}
          colIndex={colIndex}
          columns={columns}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ShowTask;
