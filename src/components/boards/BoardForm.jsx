import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addBoard, editBoard } from "../../redux/boardsSlice";

import crossIcon from "../../assets/icon-cross.svg";
import Button from "../Button";
import { closeMenu } from "../../redux/ellipsisMenuSlice";

function BoardForm({ type, onCloseModal }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive,
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      }),
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };
  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(addBoard({ name, newColumns }));
    } else {
      dispatch(editBoard({ name, newColumns }));
    }
    dispatch(closeMenu());
    onCloseModal();
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  return (
    <div className="w-[300px] p-5 font-medium text-textColor md:w-[400px]">
      <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Board</h3>

      {/* Task Name */}

      <div className="mt-8 flex flex-col space-y-1">
        <label className="text-sm">Board Name</label>
        <input
          className="input"
          placeholder="e.g Web Design"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="board-name-input"
        />
      </div>

      {/* Board Columns */}

      <div className="mt-8 flex flex-col space-y-3">
        <label className="text-sm">Board Columns</label>

        {newColumns?.map((column, index) => (
          <div key={index} className=" flex w-full items-center ">
            <input
              className="input"
              onChange={(e) => {
                onChange(column.id, e.target.value);
              }}
              type="text"
              value={column.name}
            />
            <img
              src={crossIcon}
              alt="crossIcon"
              onClick={() => {
                onDelete(column.id);
              }}
              className="m-4 cursor-pointer"
            />
          </div>
        ))}
        <div>
          <Button
            variation="secondary"
            styles="w-full my-4"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", tasks: [], id: uuidv4() },
              ]);
            }}
          >
            + Add New Column
          </Button>

          <Button
            styles="w-full"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BoardForm;
