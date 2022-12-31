import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { subgraphQuery } from "../../utils/client";
import { GET_VIDEOS } from "../../queries";
import { Video } from "../../component/Video"
import Player from "../../component/Player";
import { Header } from "../../component/Header";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Orbis } from "@orbisclub/orbis-sdk";

export default function Main() {

    const [videos, setVideos] = useState([]);
    const [data,setData]=useState(null)
    const { user, setUser, getTruncatedDID, orbis, status, setStatus } = useContext(GlobalContext)

    const getAddress = (did) => {
        return `${did.slice(17, did.length)}`
    }
    const profile=async(did)=>{
        let {data,error}=await orbis.getProfile(did)
        console.log("inside function:",data)
        setData(data)
    }
    //if(user){
    //    const address=getAddress(user.did)
    //    console.log("profile:",address) 
    //}
    const [userAddress, setUserAddress] = useState("");
    //setUserAddress(getAddress(user.did))

    function PROFILE_VIDEOS() {
        return `query{
            videoUploadeds(first:200,skip:0,orderBy:timestamp,orderDirection:desc,where:{author:"${userAddress}"}){
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

    const getProfileVideos = async () => {
        try {
            const vids = await subgraphQuery(PROFILE_VIDEOS())
            console.log(vids)
            setVideos(vids.videoUploadeds)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            console.log("profile", user)
            profile(user.did)
            if(data){
                console.log(data)
            }
            
            setUserAddress(getAddress(user.did))
            //console.log("profile", userAddress)
        }
        getProfileVideos()
    }, [user])

    return (
        <div className="w-full bg-black flex flex-row">

            <div className="flex-1 h-screen flex flex-col">
                <Header
                    search={(e) => {
                        setSearch(e)
                    }}
                    searchbar={false}
                />
                <div className="flex flex-row border-t-2 border-white">
                    <aside className="w-1/4" aria-label="Sidebar">
                        <div className="overflow-y-auto py-4 px-3 bg-black h-screen border-r-2 border-white">
                            <ul className="space-y-2">
                                <li>
                                    <a className="flex justify-center items-center p-2 text-base font-semibold text-white  ">
                                        <span >Profile</span>
                                    </a>
                                </li>
                                <li>
                                    {user?.profile?.username ?
                                        <div className="flex flex-col justify-center items-center">
                                            {
                                                user.profile.pfp ?
                                                    <Image src={user.profile.pfp} width='240' height='240' className="rounded-md" alt="profile picture" />
                                                    :
                                                    <Image src='/defaultPFP.jpeg' width='240' height='240' className="rounded-md" alt="profile picture" />
                                            }
                                            <div className="text-lg font-bold underline my-3 cursor-pointer text-white">{user.profile.username}</div>
                                        </div>
                                        :
                                        <div className="flex flex-col justify-center items-center">
                                            <Image src='/defaultPFP.jpeg' width='20' height='20' className="rounded-full" alt="profile picture" />
                                            <div>{getTruncatedDID(user?.did, 5)}</div>
                                        </div>
                                    }
                                </li>

                            </ul>
                            <div className="flex flex-row text-white justify-around items-center">
                                    <div className="flex flex-col m-4 items-center justify-center text-base font-semibold">
                                        <h1>Followers</h1>
                                         <h1>{data?.count_followers}</h1>
                                    </div>
                                    <div className="flex flex-col m-4 items-center justify-center text-base font-semibold">
                                        <h1>Following</h1>
                                        <h1>{data?.count_following}</h1>
                                    </div>
                            </div>
                        </div>
                    </aside>
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
        </div>
    );
}

