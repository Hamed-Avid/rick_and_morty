"use client";

import useOutSideClick from "@/hooks/useOutSideClick";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  handler: () => void;
};

export default function Modal({ children, title, handler }: Props) {
  const modalRef = useRef(null);
  useOutSideClick(modalRef, handler);

  return (
    <div className="absolute left-0 top-0 bottom-0 right-0 h-screen w-screen bg-slate-100/20 z-10 flex justify-center">
      <div
        ref={modalRef}
        className="bg-slate-700 rounded-xl w-full max-w-fit max-h-fit mt-40 p-3 flex flex-col gap-3 border border-white/20 shadow-white shadow-sm z-50"
      >
        <div className="flex items-center justify-between">
          <h5 className="text-slate-400 font-bold md:text-lg whitespace-nowrap">
            {title}
          </h5>
          <button data-test="close" onClick={handler}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-5 h-5 stroke-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
