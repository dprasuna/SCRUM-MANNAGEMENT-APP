import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      const isNestedModalClicked = e.target.closest(".nested-modal");
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !isNestedModalClicked
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
