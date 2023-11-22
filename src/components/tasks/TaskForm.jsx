import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { closeMenu } from "../../redux/ellipsisMenuSlice";

import crossIcon from "../../assets/icon-cross.svg";
import Button from "../Button";

function TaskForm({ type, taskIndex, prevColIndex = 0, onCloseModal }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive,
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      }),
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        }),
      );
    } else {
      dispatch(
        editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        }),
      );
    }
    onCloseModal();
    dispatch(closeMenu());
  };

  return (
    <div className="w-[300px] p-5 font-medium text-textColor md:w-[400px] ">
      <h3 className=" text-lg ">{type === "edit" ? "Edit" : "Add New"} Task</h3>
      {/* Task Name */}
      <div className="mt-8 flex flex-col space-y-1">
        <label className="text-sm">Task Name</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="task-name-input"
          type="text"
          className="input"
          placeholder="e.g Take coffee break"
        />
      </div>
      {/* Description */}
      <div className="mt-8 flex flex-col space-y-1">
        <label className="text-sm">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="task-description-input"
          className="input h-[200px] resize-none"
          placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
        />
      </div>
      {/* Subtasks */}
      <div className="mt-8 flex flex-col space-y-3">
        <label className="text-sm">Subtasks</label>
        {subtasks.map((subtask, index) => (
          <div key={index} className=" flex w-full items-center ">
            <input
              onChange={(e) => {
                onChangeSubtasks(subtask.id, e.target.value);
              }}
              type="text"
              value={subtask.title}
              className="input"
              placeholder="e.g Take coffee break"
            />
            <img
              src={crossIcon}
              alt="crossIcon"
              onClick={() => {
                onDelete(subtask.id);
              }}
              className=" m-4 cursor-pointer "
            />
          </div>
        ))}

        <Button
          variation="secondary"
          onClick={() => {
            setSubtasks((state) => [
              ...state,
              { title: "", isCompleted: false, id: uuidv4() },
            ]);
          }}
        >
          + Add New Subtask
        </Button>
      </div>
      {/* current Status  */}
      <div className="mt-8 flex flex-col space-y-3">
        <label className="text-sm">Current Status</label>
        <select
          value={status}
          onChange={onChangeStatus}
          className="select-status input"
        >
          {columns.map((column, index) => (
            <option key={index}>{column.name}</option>
          ))}
        </select>
        <Button
          styles="mt-4"
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
            }
          }}
        >
          {type === "edit" ? " save edit" : "Create task"}
        </Button>
      </div>
    </div>
  );
}

export default TaskForm;
