import { useState } from "react";

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

  return (
    <div>
      <div className="container py-4">

        <h1 className="mb-5">Message: {message}</h1>
        {

          videoCall ? (
            <VideoCall
              videoCallData={videoCallData}
              setVideoCall={setVideoCall}
              setMessage={setMessage}
            />
          ) : (


            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group row ">

                <select
                  value={videoCallData.role}
                  onChange={handleChange}
                  name="role"
                  className="form-control"
                >
                  <option value="subscriber">Role subscriber</option>
                  <option value="publisher">Role publisher</option>
                </select>
              </div>
              <div className="form-group row ">
                <input
                  id="uid"
                  placeholder="User ID"
                  name="uid"
                  value={videoCallData.uid}
                  onChange={handleChange}
                  margin="normal"
                  className="form-control"
                />
              </div>
              <div className="form-group row ">

                <input
                  id="channel"
                  placeholder="Channel name"
                  name="channel"
                  value={videoCallData.channel}
                  onChange={handleChange}
                  margin="normal"
                  className="form-control"
                />
              </div>

              <div className="row">

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCall}
                >
                  Start Video Call
                </button>
              </div>
            </div>

          )
        }
      </div>
    </div>
  )
};

export default Form;
