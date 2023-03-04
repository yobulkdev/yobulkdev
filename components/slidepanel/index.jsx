import React, { useState } from 'react';

const SlidePanel = ({ data }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="relative z-30 flex items-center cursor-pointer right-4 top-3"
          fill="#2563EB"
          viewBox="0 0 100 80"
          width="30"
          height="30"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`top-0 right-0 w-[35vw] bg-blue-500  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? 'translate-x-0 ' : 'translate-x-full'
        }`}
      >
        <h3 className="mt-10 text-4xl font-semibold text-white">
          I am YoAssistant!
        </h3>
        <p className="mt-10">Coming soon!</p>
        <p>{data}</p>
      </div>
    </>
  );
};

export default SlidePanel;
