import { useEffect } from "react";

export default function useOutSideClick(
  ref: React.RefObject<any>,
  handler: () => void
) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleOutSideClick: EventListenerOrEventListenerObject = (
        e: Event
      ) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      };
      document.addEventListener("mousedown", handleOutSideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutSideClick);
      };
    }
  }, [ref, handler]);
}
