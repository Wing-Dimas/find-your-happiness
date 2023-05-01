import React from "react";

export default function Button({
  children,
  handleClick,
  state = false,
  disabled = false,
}) {
  return (
    <button
      className={`flex flex-1 justify-center items-center font-normal text-xl p-2 rounded-lg hover:ring-2 hover: ring-primary-blue transition-all ${
        state
          ? "bg-primary-blue text-white"
          : "bg-white border border-primary-blue text-primary-blue"
      } disabled:bg-slate-400 disabled:text-white disabled:border-none disabled:ring-0`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
