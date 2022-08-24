import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";

//For rtcProps you must set the following properties:
//appId: The App ID of your Agora account.
//channel: The channel name for the AgoraRTC session.
//token: The token for authentication.
//uid: The user ID for this client.
//For callbacks you must set the following properties:
//EndCall: The callback function for ending the call.

//Token get url sintax is
//Base url https://mediline-agora-token-service.herokuapp.com/rtc/:channel/:role/:uid/
//:channel is the channel name
//:role is the role of the user (publisher or subscriber)
//:uid is the user id
//Example: https://mediline-agora-token-service.herokuapp.com/rtc/test/publisher/uid/123456/

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const rtcProps = {
    appId: "52a29b8c9c6444d2afd6e7038eaa3e0a",
    channel: "test",
    token:
      "00652a29b8c9c6444d2afd6e7038eaa3e0aIAAXT47SCnkHI20/+6Y41vIvMJflbcGT95nFthuazjsyBgx+f9hh03IJIgBRsHoBjG4HYwQAAQAcKwZjAgAcKwZjAwAcKwZjBAAcKwZj",
    uid: 123456,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
  );
};

export default App;
