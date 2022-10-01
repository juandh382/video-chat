
import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

const APP_ID = 'c1524ecb52da48a88e4bd610d33c2334';
const TOKEN = '007eJxTYFitKK08MeODuBTbozkmTqaJ5k7RLME+p/YZ/Zm8PyG1TkOBIdnQ1MgkNTnJ1Cgl0cQi0cIi1SQpxczQIMXYONnI2Njk5i7z5G3clsmOzx6wMjJAIIjPzFCeksXAAABQmB3P';
const CHANNEL = 'wdj';

const agoraEngine = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
});

export const VideoRoom = () => {

    const [users, setUsers] = useState([]);

    const [tracks, setTracks] = useState([]);

    const handleUserJoined = async (user, mediaType) => {
        await agoraEngine.subscribe(user, mediaType);

        setUsers(previousUsers => [
            ...previousUsers,
            user
        ]);
    }

    const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
            previousUsers.filter(u => u.uid !== user.uid)
        );
    }

    useEffect(() => {
        agoraEngine.on("user-published", handleUserJoined);
        agoraEngine.on("user-unpublished", handleUserLeft);


        agoraEngine
            .join(APP_ID, CHANNEL, TOKEN, null)
            .then((uid) =>
                Promise.all([
                    AgoraRTC.createMicrophoneAndCameraTracks(),
                    uid,
                ])
            )
            .then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;
                setTracks(tracks);
                setUsers((previousUsers) => [
                    ...previousUsers,
                    {
                        uid,
                        videoTrack,
                        audioTrack,
                    },
                ]);
                agoraEngine.publish(tracks);
            });

        return () => {
            for (let localTrack of tracks) {
                localTrack.stop();
                localTrack.close();
            }
            agoraEngine.off('user-published', handleUserJoined);
            agoraEngine.off('user-left', handleUserLeft);
            // agoraEngine.unpublish(tracks).then(() => client.leave());
        };
    }, [tracks])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 200px)'
                }}
            >
                {
                    users.map((user) => (
                        <VideoPlayer
                            key={user.uid}
                            user={user}
                        />
                    ))
                }
            </div>
        </div>
    )
}
