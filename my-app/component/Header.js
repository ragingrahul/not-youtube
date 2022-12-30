import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Header = ({ search }) => {
  return (
    <header className="w-full flex justify-between h-20 items-center bg-white border-b p-4 border-[#202229]">
      <div className=" w-1/3    ">
        <img
          width={80}
          src="./logo.png"
          alt="YouTube Logo"
        />
      </div>
      <div className=" w-1/3 flex justify-center items-center">
        {search ? (
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="Type to search"
            className="bg-transparent text-black border-grey-600"
          />
        ) : null}
      </div>
      <div className=" w-1/3 flex justify-end">
        <AiOutlinePlusCircle
          onClick={() => {
            window.location.href = "/uploads";
          }}
          size="30px"
          className="mr-8 fill-blue-500  cursor-pointer"
        />
      </div>
    </header>
  );
};
