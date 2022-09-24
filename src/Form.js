import React, { useState } from "react";

import VideoCall from "./VideoCall";
const Form = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [message, setMessage] = useState("");
  const [videoCallData, setVideoCallData] = useState({
    uid: "",
    role: "subscriber",
    channel: "channel-test",
    layout: 1,
  });

  const handleCall = () => {
    if (!videoCallData.uid || !videoCallData.role || !videoCallData.channel) {
      console.log(videoCallData);
      alert("Please enter all the fields");
      return;
    }
    setMessage("");
    setVideoCall(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVideoCallData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return videoCall ? (
    <VideoCall
      videoCallData={videoCallData}
      setVideoCall={setVideoCall}
      setMessage={setMessage}
    />
  ) : (
    <>
      <div>
        <h1>Message: {message}</h1>
        <select value={videoCallData.role} onChange={handleChange} name="role">
          <option value="subscriber">Role subscriber</option>
          <option value="publisher">Role publisher</option>
        </select>
        <p></p>
        <div className="container">
          <input
            id="uid"
            placeholder="User ID"
            name="uid"
            value={videoCallData.uid}
            onChange={handleChange}
            margin="normal"
          />

          <p></p>
          <input
            id="channel"
            placeholder="Channel name"
            name="channel"
            value={videoCallData.channel}
            onChange={handleChange}
            margin="normal"
          />

          <p></p>
          <button type="button" onClick={handleCall}>
            Start Video Call
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
