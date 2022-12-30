import React from "react";
import Player from "./Player";

export  function VideoComponent({ video }) {
  console.log(video);
  return (
    <div>
      <Player video={video} />
      <div className="flex justify-between flex-row py-4 text-white">
        <div>
          <h3 className="text-2xl dark:text-white">{video.title}</h3>
          <p className="text-gray-500 mt-1">
            {video.category} •{" "}
            {new Date(video.timestamp * 1000).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
