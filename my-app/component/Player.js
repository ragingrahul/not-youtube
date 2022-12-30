import React from "react";
import { useAsset } from "@livepeer/react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function Player({ video }) {
  console.log(video);
  const { data: asset } = useAsset(video.hash);

  return (
    <Plyr
      source={{
        type: "video",
        title: asset?.name,

        sources: [
          {
            src: asset?.downloadUrl,
            type: "video/mp4",
          },
        ],
      }}
      options={{
        autoplay: true,
      }}
      autoPlay={true}
    />
  );
}
