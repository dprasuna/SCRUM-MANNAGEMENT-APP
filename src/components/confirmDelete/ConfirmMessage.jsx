import { useDispatch } from "react-redux";
import {
  deleteBoard,
  deleteTask,
  setBoardActive,
} from "../../redux/boardsSlice";

import Button from "../Button";
import { closeMenu } from "../../redux/ellipsisMenuSlice";

function ConfirmMessage({ type, title, taskIndex, colIndex, onCloseModal }) {
  const dispatch = useDispatch();

  const onDeleteBtnClick = () => {
    if (type === "task") {
      dispatch(deleteTask({ taskIndex, colIndex }));
    } else {
      dispatch(deleteBoard());
      dispatch(setBoardActive({ index: 0 }));
    }
    dispatch(closeMenu());
    onCloseModal();
  };

  return (
    <div className="w-[300px] p-5 font-medium text-textColor md:w-[400px] ">
      <h3 className="text-xl font-bold text-red-500">Delete this {type}?</h3>
      {type === "task" ? (
        <p className="pt-6 text-xs font-[600] tracking-wide">
          Are you sure you want to delete the "{title}" task and its subtasks?
          This action cannot be reversed.
        </p>
      ) : (
        <p className="pt-6 text-xs font-[600] tracking-wide">
          Are you sure you want to delete the "{title}" board? This action will
          remove all columns and tasks and cannot be reversed.
        </p>
      )}

      <div className=" mt-4 flex w-full items-center justify-center space-x-4 ">
        <Button variation="danger" styles="w-full" onClick={onDeleteBtnClick}>
          Delete
        </Button>
        <Button
          variation="secondary"
          styles="w-full"
          onClick={() => onCloseModal()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ConfirmMessage;
