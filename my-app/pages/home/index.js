import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { subgraphQuery } from "../utils/client";
import { GET_VIDEOS } from "../../queries";
import { Video } from "../../component/Video"
import Player from "../../component/Player";
import { Header } from "../../component/Header";

export default function Main() {
    // Creating a state to store the uploaded video
    const [videos, setVideos] = useState([]);
    const [search,setSearch] = useState("");

    function SEARCH_VIDEOS(){
        return `query{
            videoUploadeds(first:200,skip:0,orderBy:timestamp,orderDirection:desc,where:{title:"${search}"}){
                id
                hash
                title
                description
                location
                category
                thumbnailHash
                date
                author
                timestamp
            }
        }`
    }

    const searchVideo =async()=>{
        try {
            console.log("entered search",search)
            const vids=await subgraphQuery(SEARCH_VIDEOS())

            console.log(vids)
            setVideos(vids.videoUploadeds)
        } catch (error) {
            console.error(error.message)
        }
    }


    const getVideos = async () => {
        try {
            const vids = await subgraphQuery(GET_VIDEOS())
            console.log(vids)
            setVideos(vids.videoUploadeds)
        } catch (error) {
            console.error(error.message);
        }

    }

    useEffect(() => {
        if(search){
            
            searchVideo();
            return
        }
        // Runs the function getVideos when the component is mounted
        getVideos();
    }, [search]);
    return (
        <div className="w-full bg-[#1a1c1f] flex flex-row">
            <div className="flex-1 h-screen flex flex-col">
                <Header 
                    search={(e)=>{
                        setSearch(e)
                    }}
                />
                <div className="flex flex-row flex-wrap">
                    {videos.map((video) => (
                        <div
                            className="w-80 text-white"
                            onClick={() => {
                                // Navigation to the video screen (which we will create later)
                                window.location.href = `/video/${video.id}`;
                            }}
                        >
                            <Video video={video} />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}
