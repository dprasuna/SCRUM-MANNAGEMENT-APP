import AddEditBoard from "./boards/AddEditBoard";
import ConfirmDelete from "./confirmDelete/ConfirmDelete";
import AddEditTask from "./tasks/AddEditTask";

function EllipsisMenu({ type, title, taskIndex, colIndex }) {
  return (
    <div
      className={`absolute
      ${type === "Boards" ? "right-5  top-20" : "right-4  top-6"}`}
    >
      <div className="flex items-center justify-end">
        <div
          className=" z-50 h-auto w-40 space-y-4 rounded-lg bg-bgc
         px-4 py-5 pr-12 text-sm font-medium  shadow-md shadow-[#364e7e1a]"
        >
          {type === "Boards" && (
            <AddEditBoard
              type={"edit"}
              openBtn={<p className="cursor-pointer">Edit {type}</p>}
            />
          )}

          {type === "task" && (
            <AddEditTask
              type="edit"
              title={title}
              taskIndex={taskIndex}
              colIndex={colIndex}
              openBtn={<p className="cursor-pointer">Edit {type}</p>}
            />
          )}

          {/* Confirm On Delete  */}
          <ConfirmDelete
            title={title}
            taskIndex={taskIndex}
            colIndex={colIndex}
            type={type}
            openBtn={
              <p className="cursor-pointer text-red-500">Delete {type}</p>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default EllipsisMenu;
