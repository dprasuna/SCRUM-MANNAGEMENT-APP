import { useSelector } from "react-redux";
import ShowTask from "./tasks/ShowTask";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex }),
    );
  };

  return (
    <ShowTask
      task={task}
      subtasks={subtasks}
      completed={completed}
      taskIndex={taskIndex}
      colIndex={colIndex}
      columns={columns}
      openBtn={
        <div>
          <div
            draggable
            onDragStart={handleOnDrag}
            className=" w-[280px] cursor-pointer rounded-lg bg-contentBgc px-3 py-6 shadow-lg first:my-5 hover:text-blue"
          >
            <p className="font-bold tracking-wide ">{task.title}</p>
            <p className="mt-2 text-xs font-bold tracking-tighter">
              {completed} of {subtasks.length} completed tasks
            </p>
          </div>
        </div>
      }
    />
  );
}

export default Task;
