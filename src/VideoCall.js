import React, { useEffect, useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import axios from "axios";

const VideoCall = ({ videoCallData, setVideoCall, setMessage }) => {
  const [token, setToken] = useState("");

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
  }, [videoCallData]);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {token && (
        <AgoraUIKit
          rtcProps={{
            appId: process.env.REACT_APP_AGORA_APP_ID,
            channel: videoCallData.channel,
            token: token,
            uid: videoCallData.uid,
            layout: videoCallData.layout,
          }}
          callbacks={{
            EndCall: () => setVideoCall(false),
            "user-joined": () =>
              console.log("MediLine - 🧍 Remote User joined"),
            "user-left": () => {
              console.log("MediLine - 🧍 Remote user left");
              setMessage("El usuario remoto se desconecto");
              setVideoCall(false);

              console.log("MediLine - 🧍 setVideoCall to end call");
            },
            "user-unpublished": () =>
              console.log("MediLine - 🧍 Remote user unpublished"),
            "user-published": () =>
              console.log("MediLine - 🧍 Remote User Publish event"),
          }}
          rtmProps={{
            username: videoCallData.uid || "user",
            displayUsername: true,
          }}
        />
      )}
    </div>
  );
};

export default VideoCall;
