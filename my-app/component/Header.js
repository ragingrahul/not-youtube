import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCloud } from "react-icons/bi";
import { ConnectButton } from "./ConnectButton";

export const Header = ({ search,searchbar }) => {
  return (
    <header className="w-full flex justify-between h-20 items-center bg-black p-4 border-b-2 border-gray-300">
      <div className=" ">
        <img
          width={80}
          src="./logo.png"
          alt="YouTube Logo"
        />
      </div>
      {searchbar&&<div className="  flex justify-center items-center">
        {search ? (
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="Type to search"
            className="bg-transparent text-black w-80 border border-white-500 rounded-lg h-8"
          />
        ) : null}
      </div>}
      <div className="  flex justify-center items-center">
        <span
          onClick={() => {
            window.location.href = "../Landing"
          }}
          className="text-white font-bold text-9xl cursor-pointer"
        >
          Landing
        </span>
      </div>
      <div className="  flex justify-center items-center">
        <span
          onClick={() => {
            window.location.href = "/home"
          }}
          className="text-white font-bold text-9xl cursor-pointer"
        >
          Home
        </span>
      </div>
      <div className="  flex justify-center items-center">
        <span
          onClick={() => {
            window.location.href = "/profile"
          }}
          className="text-white font-bold text-9xl cursor-pointer"
        >
          Profile
        </span>
      </div>
          <ConnectButton />
      <div className="  flex justify-end">
      
        <button
          onClick={() => {
            window.location.href="./uploads"
          }}
          className=" text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center font-semibold"
        >
          
          <p className="ml-2">Upload</p>
        </button>
      </div>
    </header>
  );
};
