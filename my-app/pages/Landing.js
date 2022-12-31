import React, { useState,useContext } from "react"
import { sleep } from "./utils/sleep";

import{GlobalContext}   from "../contexts/GlobalContext"
import Image from "next/image"
import { Header } from "../component/Header";
import { ConnectButton } from "../component/ConnectButton";

export default function Landing() {
    const{status}=useContext(GlobalContext)

    return (
        <>
            {/* Creating a hero component with black background and centering everything in the screen */}
            <Header 
                search={(e)=>{
                    setSearch(e)
                }}
                searchbar={false}
            />
            <section className="relative bg-black flex flex-col h-screen justify-center items-center">


                <div className="text-center pb-12 md:pb-16 flex flex-row">
                    <h1
                        className="flex w-1/3 text-7xl text-white font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400"
                        data-aos="zoom-y-out"
                    >
                        This is Youtube but on Chains!!

                    </h1>
                    <div className="flex flex-col max-w-3xl mx-auto items-center justify-center ">
                        <p
                            className="flex text-xl text-gray-400 mb-8"
                            data-aos="zoom-y-out"
                            data-aos-delay="150"
                        >
                            A YouTube Clone built on top of Polygon network, allow users
                            to create, share and watch videos, without worrying about
                            their privacy.
                        </p>
                        {!status && <ConnectButton />}
                        
                        
                    </div>
                </div>


            </section>
        </>
    )
}