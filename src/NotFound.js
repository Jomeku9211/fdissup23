import React from "react";

const NotFound = () => {
  return (
    <div className="flex gap-4 justify-center divide-x w-full mt-60">
      <div>
        <h1 className="text-5xl font-bold">404</h1>
      </div>
      <div className="">
        <h1 className="text-5xl font-bold">Page Not Found</h1>
        <p className="text-lg font-normal text-gray-400">
          Please check the url in address bar and try again
        </p>
      </div>
    </div>
  );
};

export default NotFound;
