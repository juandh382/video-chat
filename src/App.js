import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import axios from "axios";

const App = ({ uid, data, role }) => {
  const [videoCall, setVideoCall] = useState(false);
  const [token, setToken] = useState("");

  const channel = data.queueId;

  const handleCall = async () => {
    const url = `${process.env.REACT_APP_AGORA_TOKEN_SERVICE}/rtc/${channel}/${role}/uid/${uid}`;
    try {
      const response = await axios.get(url);
      const token = response.data.rtcToken;
      setToken(token);
      setVideoCall(true);
    } catch (err) {
      alert(err);
    }
  };

  const callbacks = {
    EndCall: () => {
      setToken("");
      setVideoCall(false);
    },
  };
  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit
        rtcProps={{
          appId: process.env.REACT_APP_AGORA_APP_ID,
          channel: channel,
          token: token,
          uid: uid,
        }}
        callbacks={callbacks}
      />
    </div>
  ) : (
    <h3 onClick={() => handleCall()}>Start Call</h3>
  );
};

export default App;
