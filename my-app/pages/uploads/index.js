import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
import saveToIPFS from "../utils/saveToIPFS";
import { useCreateAsset } from "@livepeer/react";
import getContract from "../utils/getContract";
import { Header } from "../../component/Header";

export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  let data
  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();

  const{
    mutate:createAsset,
    data:asset,
    uploadProgress,
    status,
    error,
  }=useCreateAsset(
    video?{
      sources:[{name: title,file:video}]
    }
    :
    null
  )

  const handleSubmit=async()=>{
    await uploadVideo()

    const thumbnailCID=await uploadThumbnail()

    data={
      video:asset?.[0]?.id,
      title,
      description,
      category,
      location,
      thumbnail:thumbnailCID,
      UploadedDate:Date.now(),
    }

    await saveVideo()
  }

  const uploadThumbnail=async()=>{
    const cid=await saveToIPFS(thumbnail)
    console.log(cid)
    return cid
    
  }

  const uploadVideo=async()=>{
    await createAsset?.()
    if(asset){
      console.log("LivePeer asset Id: " + asset[0].name)
    }
  }

  const saveVideo=async()=>{
    let contract=await getContract()

    await contract.uploadVideo(
      data.video,
      data.title,
      data.description,
      data.category,
      data.location,
      data.thumbnail,
      data.UploadedDate
    )
    console.log("did it!!")
  }

  return (
    <div className="w-full h-screen bg-black flex flex-row">
      <div className="flex-1 flex flex-col">
        <Header 
          search={(e)=>{
            setSearch(e)
          }}
          searchbar={false}
        />
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button className="border-2 border-white text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center">
              Discard
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="border-2 border-white text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center mx-2"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-black border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-black border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-black border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-black border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

            <div
              onClick={() => {
                thumbnailRef.current.click();
              }}
              className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
            >
              {thumbnail ? (
                <img
                  onClick={() => {
                    thumbnailRef.current.click();
                  }}
                  src={URL.createObjectURL(thumbnail)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>

            <input
              type="file"
              className="hidden"
              ref={thumbnailRef}
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>

          <div
            onClick={() => {
              videoRef.current.click();
            }}
            className={
              video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
            }
          >
            {video ? (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="h-full rounded-md"
              />
            ) : (
              <p className="text-[#9CA3AF]">Upload Video</p>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={"video/*"}
          onChange={(e) => {
            setVideo(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}
