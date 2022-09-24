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

  const callbacks = {
    EndCall: () => setVideoCall(false),
    "user-joined": () => {
      // https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.RtcEventsInterface.html#user_joined
      console.log("MediLine - 🧍 Remote User joined");
    },
    "user-left": () => {
      //https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.RtcEventsInterface.html#user_left
      console.log("MediLine - 🧍 Remote user left");
      setMessage("MediLine - 🧍 Remote user left");
      setVideoCall(false);
      console.log("MediLine - 🧍 setVideoCall to end call");
    },
    // "user-unpublished": () => {
    //   //https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.RtcEventsInterface.html#user_published
    //   console.log("MediLine - 🧍 Remote user unpublished");
    // },
    // "user-published": () => {
    //   // https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.RtcEventsInterface.html#user_unpublished
    //   console.log("MediLine - 🧍 Remote User Publish event");
    // },
    // "network-quality": (e) => {
    //   //https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.NetworkQuality.html
    //   console.log(
    //     "MediLine - 🧍 network-quality donwlink (0 unknow 1 excellent to 6 disconnected): " +
    //       e.downlinkNetworkQuality
    //   );
    //   console.log(
    //     "MediLine - 🧍 network-quality uplink (0 unknow 1 excellent to 6 disconnected): " +
    //       e.uplinkNetworkQuality
    //   );
    // },

    // "local-user-mute-audio": (e) => {
    //   //https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.UIKitEventsInterface.html#local-user-mute-audio
    //   console.log("MediLine - 🧍 local-user-mute-audio: " + e);
    // },
    // "remote-user-mute-audio": (e) => {
    //   //https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.UIKitEventsInterface.html#remote_user_mute_audio
    //   console.log("MediLine - 🧍 remote-user-mute-audio: " + e);
    // },
    // More about RTC Interface https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.RtcEventsInterface.html
    //https://agoraio-community.github.io/Web-React-UIKit/interfaces/_internal_.UIKitEventsInterface.html
    // channel-media-relay-event
    // channel-media-relay-state
    // connection-state-change
    // crypt-error
    // is-using-cloud-proxy
    // live-streaming-error
    // live-streaming-warning
    // media-reconnect-end
    // media-reconnect-start
    // network-quality
    // stream-fallback
    // stream-inject-status
    // stream-type-changed
    // token-privilege-did-expire
    // token-privilege-will-expire
    // user-info-updated
    // user-joined
    // user-left
    // user-published
    // user-unpublished
    // volume-indicator
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {token && (
        <AgoraUIKit
          rtcProps={{
            appId: process.env.REACT_APP_AGORA_APP_ID,
            channel: videoCallData.channel,
            token: token,
            uid: videoCallData.uid,
          }}
          callbacks={callbacks}
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
