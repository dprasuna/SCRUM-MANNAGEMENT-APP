import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEllipsisMenu, changePlace } from "../redux/ellipsisMenuSlice";

import Logo from "../assets/logo.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import EllipsisMenu from "./EllipsisMenu";
import Button from "./Button";
// Add Edit Task Modal
import AddEditTask from "./tasks/AddEditTask";

function Header() {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { showEllipsisMenu, place } = useSelector(
    (state) => state.ellipsisMenu,
  );

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
  };

  const onShowEllipsisMenu = () => {
    dispatch(toggleEllipsisMenu());
    dispatch(changePlace("Boards"));
  };

  return (
    <div className="fixed left-0 right-0 z-50 bg-contentBgc p-4">
      <header className="flex items-center justify-between">
        {/* Left Side  */}
        <div className="flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h3 className="hidden font-sans font-bold md:inline-block md:text-4xl">
          UnityDesk
          </h3>
          <div className="flex items-center">
            <h3 className="max-w-[200px] truncate font-sans text-xl font-bold md:ml-20 md:text-2xl">
              {board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="ml-2 w-3 cursor-pointer md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center space-x-4 md:space-x-6">
          <AddEditTask
            type="add"
            openBtn={
              <Button>
                <span className="hidden md:block">+ Add New Task</span>
                <span className="block md:hidden">+</span>
              </Button>
            }
          />

          <img
            onClick={() => {
              setOpenDropdown(false);
              onShowEllipsisMenu();
            }}
            src={ellipsis}
            alt="ellipsis"
            className=" h-6 cursor-pointer"
          />
          {showEllipsisMenu && place === "Boards" && (
            <EllipsisMenu type="Boards" title={board?.name} />
          )}
        </div>

        {openDropdown && <HeaderDropDown setOpenDropdown={setOpenDropdown} />}
      </header>
    </div>
  );
}

export default Header;
