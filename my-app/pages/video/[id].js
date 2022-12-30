import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import {Video} from "../../component/Video"
import {VideoComponent} from "../../component/VideoContainer";
import { GET_RELATED_VIDEOS } from "../../queries";
import { subgraphQuery } from "../utils/client";
import {useRouter} from "next/router"
import { resultKeyNameFromField } from "@apollo/client/utilities";

export default function VideoPage() {
  const router=useRouter()
  const {id}=router.query
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  const client = useApolloClient();
  const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
      ) {
        id
        hash
        title
        description
        location
        category
        thumbnailHash
        isAudio
        date
        author
        createdAt
      }
    }
  `;

  const getRelatedVideos = async() => {
    try {
      const vids=await subgraphQuery(GET_RELATED_VIDEOS())
      setRelatedVideos(vids.videoUploadeds.filter((v) => v.id != id))
      setVideo(vids.videoUploadeds.find((v) => v.id == id))
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(!id){
      return
    }
    console.log(id)
    getRelatedVideos();
  }, [id]);

  return (
    <div className="w-full   bg-[#1a1c1f]  flex flex-row">
      <div className="flex-1 flex flex-col">
        {video && (
          <div className="flex flex-col m-10 justify-between lg:flex-row">
            <div className="lg:w-4/6 w-6/6 flex flex-row">
             <VideoComponent video={video} />
            </div>
            <div className="w-2/6 text-white flex-row" >
              <h4 className="text-md font-bold text-white ml-5 mb-3">
                Related Videos
              </h4>
              {relatedVideos.map((video) => (
                <div
                  onClick={() => {
                    window.location.href = `/video/${video.id}`;
                    setVideo(video);
                  }}
                  key={video.id}
                >
                  <Video video={video} horizontal={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
