import { useDispatch, useSelector } from "react-redux";
import { setSubtaskCompleted } from "../redux/boardsSlice";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(setSubtaskCompleted({ index, taskIndex, colIndex }));
  };

  return (
    <div
      className=" relative flex  w-full
     items-center justify-start gap-4 rounded-md p-3 hover:bg-[#635fc740] dark:bg-[#20212c]"
    >
      <input
        className=" h-4 w-4  cursor-pointer accent-blue"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={`${checked && "line-through opacity-30 "}`}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;
