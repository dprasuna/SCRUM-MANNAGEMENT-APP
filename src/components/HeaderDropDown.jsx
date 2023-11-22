import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../redux/boardsSlice";

import boardIcon from "../assets/icon-board.svg";
import ThemeToggle from "./ThemeToggle";
import AddEditBoard from "./boards/AddEditBoard";

function HeaderDropDown({ setOpenDropdown }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="dropdown absolute bottom-[-100vh] left-0 right-0  top-16  px-6 py-10 "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className="aw-full   rounded-xl bg-contentBgc py-4 shadow-md shadow-[#364e7e1a]">
        <h3 className="mx-4 mb-8 font-semibold">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className="dropdown-board">
          {boards.map((board, index) => (
            <div
              className={`flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive && "mr-8 rounded-r-full  bg-blue"
              } `}
              key={index}
              onClick={() => {
                dispatch(setBoardActive({ index }));
              }}
            >
              <img
                src={boardIcon}
                className="filter-white h-4"
                alt="boardIcon"
              />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}

          <div className="flex items-baseline space-x-2  px-5 py-4 text-blue">
            <img src={boardIcon} className="filter-white h-4" alt="boardIcon" />
            {/* Add Edit Modal */}
            <AddEditBoard
              type="add"
              openBtn={
                <p
                  onClick={() => {
                    setOpenDropdown(false);
                  }}
                  className="mt-4 cursor-pointer text-lg font-bold text-blue"
                >
                  Create New Board!
                </p>
              }
            />
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
