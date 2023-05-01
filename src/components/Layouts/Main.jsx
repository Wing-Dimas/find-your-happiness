import React from "react";

export default function Main({ children }) {
  return (
    <div className="sm:w-96 w-full max-w-[384px] m-auto min-h-screen pb-5">
      {children}
    </div>
  );
}
