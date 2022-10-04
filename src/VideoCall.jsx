import { useEffect, useState } from "react";
import axios from "axios";
import { Call } from "./components/";


const VideoCall = ({ videoCallData, setVideoCall, setMessage }) => {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const [virtualBackground, setVirtualBackground] = useState({
    type: '',
    value: '',
    enable: false
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
  }, [videoCallData]);

  const toggleVideoCall = () => setVideoCall(videoCall => !videoCall);

  const handleMessage = msg => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");

    }, 3000);
  }

  const handleClick = () => {
    if (virtualBackground.enable && virtualBackground.type !== 'img' && (virtualBackground.type.trim() === '' || virtualBackground.value.trim() === '')) {
      alert('specifies all the data of the virtual background or disable it');
      return;
    }

    setReady(true);
  }

  const enableVirtualBackground = () => {

    virtualBackground.enable ? setMessage('Virtual background disabled') : setMessage('virtual background enabled');

    setVirtualBackground(prev => ({
      ...prev,
      enable: !prev.enable
    }));
  }

  const handleChange = (e) => {
    setVirtualBackground(pv => ({
      ...pv,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
      {token && ready
        ? (
          <Call
            rtcProps={{
              appId: process.env.REACT_APP_AGORA_APP_ID,
              channel: videoCallData.channel,
              token: token,
              uid: videoCallData.uid,
            }}
            toggleVideoCall={toggleVideoCall}
            handleMessage={handleMessage}
            virtualBackground={virtualBackground}
          />
        )
        :
        (
          <>

            <div>
              <button onClick={enableVirtualBackground}>Enable virtual background</button>
            </div>
            <div>
              {
                virtualBackground.enable &&
                <>
                  <div>
                    <label>Select virtual background type</label>
                    <select onChange={handleChange} name="type">
                      <option value="">Selecciona un efecto</option>
                      <option value="color">color</option>
                      <option value="img">image</option>
                      <option value="blur">blur</option>
                    </select>
                  </div>
                  {
                    virtualBackground.type !== '' &&
                    <>
                      {
                        virtualBackground.type === 'color' &&
                        <input
                          type="text"
                          placeholder="type a color in HEX code"
                          required
                          onChange={handleChange}
                          value={virtualBackground.value}
                          name="value"
                        />
                      }
                      {

                        (virtualBackground.type === 'blur') &&
                        <input
                          type="number"
                          min="1"
                          max="3"
                          placeholder="enter the blur grade"
                          required
                          onChange={handleChange}
                          value={virtualBackground.value}
                          name="value"
                        />
                      }
                    </>
                  }
                </>
              }
            </div>
            <div>
              <button
                onClick={handleClick}
              >
                Ready
              </button>
            </div>
          </>
        )
      }
    </div>
  );
};

export default VideoCall;
