

import "../styles/globals.css";
import { LivepeerConfig } from "@livepeer/react";
import LivePeerClient from "./livepeer";
import { GlobalContext } from "../contexts/GlobalContext";
import { Orbis } from "@orbisclub/orbis-sdk"
import React, { useState, useEffect } from "react";

let orbis = new Orbis()

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [currentConversationDetails, setCurrentConversationDetails] = useState("")
  const [status, setStatus] = useState(0)

  const getTruncatedDID = (did, length) => {
    if (!did) {
      return ''
    }
    return `${did.slice(0, length + 2)}...${did.slice(did.length - length)}`
  }

  useEffect(() => {
    const checkConnection =async()=>{
      if(user==null){
        let res=await orbis.isConnected()
        console.log("Connection Status",res.status)
        if(res.status==200){
          setStatus(2)
          setUser(res.details)
        }
      }
    }
    checkConnection()
  },[])

  return (
    <GlobalContext.Provider
      value={
        {
          user,
          setUser,
          currentConversationDetails,
          setCurrentConversationDetails,
          status,
          setStatus,
          getTruncatedDID,
          orbis
        }
      }
    >
      <LivepeerConfig client={LivePeerClient}>
        <Component {...pageProps} />
      </LivepeerConfig>
    </GlobalContext.Provider>
  );
}

export default MyApp;
