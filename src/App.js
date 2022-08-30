import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import axios from "axios";

const App = ({ id, data, rol }) => {
  const [videoCall, setVideoCall] = useState(false);
  const channel = data.queueId;
  const rtcProps = {
    appId: process.env.REACT_APP_AGORA_APP_ID,
    channel: channel,
    token: "",
    uid: id,
  };

  useEffect(() => {
    const getToken = async () => {
      const url = `${process.env.REACT_APP_AGORA_TOKEN_SERVICE}/rtc/${rtcProps.channel}/${rol}/uid/${rtcProps.uid}`;
      console.log(url);
      const response = await axios.get(url);
      const token = response.data.rtcToken;
      console.log("token", token);
      rtcProps.token = token;
      //eslint-disable-next-line
      console.log(rtcProps);
      //eslint-disable-next-line
      console.log(data);
    };

    getToken();
  }, []);

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return <h1>Hola</h1>;
};
// <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />

export default App;
