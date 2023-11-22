import { useState } from "react";
import { setTaskStatus } from "../../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { changePlace, toggleEllipsisMenu } from "../../redux/ellipsisMenuSlice";

import EllipsisMenu from "../EllipsisMenu";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Subtask from "../Subtask";
import Button from "../Button";

function TaskLayout({
  task,
  subtasks,
  completed,
  taskIndex,
  colIndex,
  columns,
  onCloseModal,
}) {
  const dispatch = useDispatch();
  const col = columns.find((col, i) => i === colIndex);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [status, setStatus] = useState(task?.status);
  const { showEllipsisMenu, place } = useSelector(
    (state) => state.ellipsisMenu,
  );

  const onChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setStatus(e.target.value);
    setNewColIndex(selectedIndex);
    setStatus(columns[selectedIndex].name);
  };

  const onClose = () => {
    dispatch(
      setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      }),
    );
    onCloseModal();
  };

  const onShowEllipsisMenu = () => {
    dispatch(toggleEllipsisMenu());
    dispatch(changePlace("Tasks"));
  };

  return (
    <div className="w-[300px] p-5 font-medium text-textColor md:w-[400px] ">
      <div className="relative flex w-full items-center justify-between">
        <h1 className=" text-lg">{task?.title}</h1>

        <img
          src={ellipsis}
          alt="ellipsis"
          className=" h-6 cursor-pointer"
          onClick={() => onShowEllipsisMenu()}
        />

        {showEllipsisMenu && place === "Tasks" && (
          <EllipsisMenu
            title={task.name}
            type="task"
            taskIndex={taskIndex}
            colIndex={colIndex}
          />
        )}
      </div>
      <p className="pt-6 text-xs font-[600] tracking-wide text-gray-500">
        {task?.description}
      </p>

      <p className="pt-6 text-sm tracking-widest text-gray-500">
        Subtasks ({completed} of {subtasks?.length})
      </p>

      {/* subtasks section */}

      <div className=" mt-3 space-y-2">
        {subtasks.map((subtask, index) => {
          return (
            <Subtask
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
              key={index}
            />
          );
        })}
      </div>

      {/* Current Status Section */}

      <div className="mt-8 flex flex-col space-y-3">
        <label className="text-sm">Current Status</label>
        <select
          className="select-status input"
          value={status}
          onChange={onChange}
        >
          {columns?.map((col, index) => (
            <option className="status-options" key={index}>
              {col.name}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={() => onClose()} styles="w-full mt-4">
        Save Changes
      </Button>
    </div>
  );
}

export default TaskLayout;
