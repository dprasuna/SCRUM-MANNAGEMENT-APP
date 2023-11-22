import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@headlessui/react";
import { toggleTheme } from "../redux/themeSlice";

import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";

function ThemeToggle() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="mx-2 flex items-center justify-center space-x-2 rounded-lg bg-bgc p-4">
      <img src={lightIcon} alt="Light Icon" />
      <Switch
        checked={theme}
        onChange={handleToggle}
        className={`${
          theme ? "bg-blue" : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full`}>
        <span
          className={`${
            theme ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}></span>
      </Switch>
      <img src={darkIcon} alt="Dark Icon" />
    </div>
  );
}

export default ThemeToggle;
