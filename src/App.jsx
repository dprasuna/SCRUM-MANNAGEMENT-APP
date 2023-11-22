import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "./redux/boardsSlice";
import { useEffect } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards?.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) dispatch(setBoardActive({ index: 0 }));

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="overflow-hidden overflow-x-auto bg-bgc text-textColor">
      <>
        {boards?.length > 0 ? (
          <>
            <Header />
            <Home />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default App;
