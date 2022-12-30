import React from "react";
import { BiCheck } from "react-icons/bi";
import moment from "moment";


export function Video({ horizontal, video }) {
  const date=new Date(video.timestamp*1000)
  const dateFormat=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
  return (
    <div
      className="flex flex-col m-10"
    >
      <img
        className={
          horizontal
            ? "object-cover rounded-lg w-10"
            : "object-cover rounded-lg"
        }
        src={`https://ipfs.io/ipfs/${video.thumbnailHash}`}
        alt=""
      />
      <div className={horizontal && "ml-3  w-80"}>
        <h4 className="text-md font-bold dark:text-white mt-3">
          {video.title}
        </h4>
        <p className="text-sm flex items-center text-[#878787] mt-1">
          {video.category + " • "+ dateFormat}
        </p>
        <p className="text-sm flex items-center text-[#878787] mt-1">
          {video?.author?.slice(0, 9)}...{" "}
          <BiCheck size="20px" color="green" className="ml-1" />
        </p>
      </div>
    </div>
  );
}
