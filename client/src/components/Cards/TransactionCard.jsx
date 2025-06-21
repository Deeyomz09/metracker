// components/Card.jsx
import React from "react";

const Card = ({ title, content, buttonLabel, onClick, children }) => {
  return (
    <div className="border-t border-b border-gray-300 p-4 shadow-md rounded-md space-y-4 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600">{content}</p>
        </div>
        {buttonLabel && (
          <button
            onClick={onClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {buttonLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;
