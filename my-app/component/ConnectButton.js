import React, { useState,useContext } from "react"
import { sleep } from "../pages/utils/sleep";

import{GlobalContext}   from "../contexts/GlobalContext"
import Image from "next/image"

export function ConnectButton(){
    const {user,setUser,getTruncatedDID,orbis,status,setStatus}=useContext(GlobalContext)

    const connect=async()=>{
        setStatus(1)

        let res= await orbis.connect_v2({
            provider:window.ethereum,
            let:false
        })
        
        switch(res.status){
            case 200:
                setStatus(2)
                console.log("Connected to Ceramic",res)
                setUser(res.details)

                break;
            
            default:
                console.log("Couldn't connect to Ceramic:",res.error.message)
                setStatus(3)    
                    
                await sleep(2000)
                setStatus(0)
        }
    }
    const logout=async()=>{
        setStatus(1)
        
        let res=await orbis.logout()

        switch(res.status){
            case 200:
                setStatus(0)

                console.log("Logged out from Orbis and Ceramic",res.result)
                setUser(null)

                break;
            
            default:
                console.log("Couldn't Logout",res.error.message)
                setStatus(3)    
                
                await sleep(2000)
                setStatus(2)
        }
    }

    switch(status){
        case 0:
            return(
                <button
                    type="button"
                    onClick={connect}
                    className="text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center border-2 border-white">
                    <p className=" text-base font-semibold text-white">Connect</p>
                </button>
            )
        
        case 1:
            return(
                <button
                    type="button"
                    className="text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center border-2 border-white">
                    <p className=" text-base font-semibold text-white">Loading...</p>
                </button>
            )

        case 2:
            //console.log("user",user)
            return(
                <div className="flex flex-row w-80 justify-between">
                    <button className="text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center border-2 border-white ">
                        {user.profile?.username?
                            <div className="flex">
                                {
                                    user.profile.pfp?
                                        <Image src={user.profile.pfp} width='20' height='20' className="rounded-full" alt="profile picture" />
                                        :
                                        <Image src='/defaultPFP.jpeg' width='20' height='20' className="rounded-full" alt="profile picture" />                               
                                }
                                <div className="text-base font-semibold  text-white mx-2">{user.profile.username}</div>
                            </div>
                            :
                            <div className="flex">
                                    <Image src='/defaultPFP.jpeg' width='20' height='20'className="rounded-full" alt="profile picture" />
                                    <div className="mx-2">{getTruncatedDID(user.did,5)}</div>
                            </div>
                        }
                    </button>
                    <button onClick={logout} className="text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center border-2 border-white">
                    <p className="text-base font-semibold text-white">Logout</p>
                    </button>
                </div>
            )

        case 3:
            return(
                <button
                    type="button"
                    className="text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center border-2 border-white">
                    <p className="text-white text-base font-semibold">Error</p>
                </button>
            )
            
    }
}