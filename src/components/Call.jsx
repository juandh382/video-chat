import { useCallback, useEffect } from 'react';
import AgoraRTC from "agora-rtc-sdk";
import { v4 as uuidv4 } from 'uuid';

const USER_ID = uuidv4();

const Call = () => {
    const localStream = AgoraRTC.createStream({
        streamID: USER_ID,
        audio: true,
        video: true,
        screen: false
    });

    const initLocalStream = useCallback(() => {
        localStream.init(
            function () {
                console.log("getUserMedia successfully");
                localStream.play("agora_local");
            },
            function (err) {
                console.log("getUserMedia failed", err);
            }
        );
    }, [localStream]);

    useEffect(() => {
        initLocalStream();
    }, [initLocalStream]);

    return (
        <>
            <div
                id="agora_local"
                style={{ width: "400px", height: "400px" }}
            ></div>
        </>
    )
}

export default Call;
