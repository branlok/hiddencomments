import React from "react";

function CommentPlaceholder() {
  return (
    <div
      className={`
        animate-pulse min-h-24 w-full bg-cblue-300 px-4 py-4  my-2 rounded-md flex flex-col justify-center border-2 border-gray-500  transition text-gray-500`}
    >
      <p>Loading</p>
    </div>
  );
}

export default CommentPlaceholder;
