import React from "react";

const InfoCards = ({ label, value }) => {
  return (
    <div>
      <a
        href="#"
        className="block max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-400">
          {label}
        </h5>
        <h1 className="ml-2 text-2xl font-bold tracking-tight text-gray-900">
          {value}
        </h1>
      </a>
    </div>
  );
};

export default InfoCards;
