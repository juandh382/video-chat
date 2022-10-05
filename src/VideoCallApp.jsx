import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Call } from "./components";


const VideoCallApp = () => {

  const [token, setToken] = useState("");

  const [videoCallData, setVideoCall] = useState({
    uid: uuidv4(),
    role: "subscriber",
    channel: "channel-test",
    layout: 1,
  });

  const [virtualBackgroundData, setVirtualBackgroundData] = useState({
    type: 'color',
    value: '#00ff00',
  });

  useEffect(() => {
    const getToken = async () => {
      const url = `${process.env.REACT_APP_AGORA_TOKEN_SERVICE}/rtc/${videoCallData.channel}/${videoCallData.role}/uid/${videoCallData.uid}`;
      try {
        const response = await axios.get(url);
        const token = response.data.rtcToken;
        setToken(token);
      } catch (err) {
        alert(err);
      }
    };
    getToken();
  }, []);


  return token &&
    (
      <Call
        rtcProps={{
          appId: process.env.REACT_APP_AGORA_APP_ID,
          channel: videoCallData.channel,
          token: token,
          uid: videoCallData.uid,
        }}
        virtualBackground={virtualBackgroundData}
      />

    )
};

export default VideoCallApp;
