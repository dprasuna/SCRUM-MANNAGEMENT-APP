import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import AddEditBoard from "./boards/AddEditBoard";

function Home() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={`
         gap-6 overflow-auto bg-bgc pb-4
        ${
          windowSize[0] >= 768 && isSideBarOpen
            ? `ml-[261px] flex h-screen`
            : `flex h-screen gap-6`
        }`}
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}

      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}

          <AddEditBoard
            type="edit"
            openBtn={
              <div
                className="mx-5 mb-2 mt-[135px] flex
             h-screen min-w-[280px] cursor-pointer items-center
              justify-center rounded-lg bg-contentBgc pt-[90px] text-2xl
                font-bold transition duration-300
                scrollbar-hide hover:text-blue"
              >
                + New Column
              </div>
            }
          />
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
    </div>
  );
}

export default Home;
