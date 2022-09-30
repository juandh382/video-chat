import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AgoraRTC from "agora-rtc-sdk";

const client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

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


    const initClient = useCallback(() => {
        client.init(
            'ee906fa7afb14cfbbb16d4bd60a9d227',
            function () {
                console.log("AgoraRTC client initialized");
            },
            function (err) {
                console.log("AgoraRTC client init failed", err);
            }
        );
    }, []);


    useEffect(() => {
        initLocalStream();
        initClient();
    }, [initLocalStream, initClient]);

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
