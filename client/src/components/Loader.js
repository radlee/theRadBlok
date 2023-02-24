import React from "react";

function Loader() {
  return (
    <div className="bg-black flex items-center justify-center opacity-70 absolute inset-0 z-[10000]">
      <div className="h-20 w-20 border-4 border-t-red rounded-full animate-spin border-white"></div>
    </div>
  );
}

export default Loader;
