"use client";

type Props = {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  handler: () => void;
};

export default function Modal({ children, title, isOpen, handler }: Props) {
  if (!isOpen) return null;

  return (
    <div>
      <div
        onClick={handler}
        className="absolute top-0 left-0 w-full h-full bg-slate-100/20 z-10"
      ></div>
      <div className="absolute top-1/4 left-1/3 bg-slate-700 rounded-xl w-1/3 p-3 flex flex-col gap-3 border border-white/20 shadow-white shadow-sm z-50">
        <div className="flex items-center justify-between">
          <h5 className="text-slate-400 font-bold text-lg">{title}</h5>
          <button onClick={handler}>
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
