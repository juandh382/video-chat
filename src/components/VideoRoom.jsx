
import { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VirtualBackgroundExtension from "agora-extension-virtual-background";

import { VideoPlayer } from "./VideoPlayer";

const APP_ID = 'c1524ecb52da48a88e4bd610d33c2334';
const TOKEN = '007eJxTYFitKK08MeODuBTbozkmTqaJ5k7RLME+p/YZ/Zm8PyG1TkOBIdnQ1MgkNTnJ1Cgl0cQi0cIi1SQpxczQIMXYONnI2Njk5i7z5G3clsmOzx6wMjJAIIjPzFCeksXAAABQmB3P';
const CHANNEL = 'wdj';

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
});

// Create a VirtualBackgroundExtension instance
const extension = new VirtualBackgroundExtension();


export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const [processor, setProcessor] = useState({});

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
            setUsers((previousUsers) => [...previousUsers, user]);
        }

        if (mediaType === 'audio') {
            user.audioTrack.play()
        }
    };

    const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
            previousUsers.filter((u) => u.uid !== user.uid)
        );
    };


    useEffect(() => {
        client.on('user-published', handleUserJoined);
        client.on('user-left', handleUserLeft);

        client
            .join(APP_ID, CHANNEL, TOKEN, null)
            .then((uid) =>
                Promise.all([
                    AgoraRTC.createMicrophoneAndCameraTracks(),
                    uid,
                ])
            )
            .then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;

                setLocalTracks(tracks);

                setProcessor(extension.createProcessor());

                const initProcessor = async () =>
                    await processor.init("../assets/agora-wasm.wasm");


                initProcessor()
                    .then(() => console.log('processor has been initialized'))
                    .catch(error => console.log(`Error initializing extension: ${error}`));

                videoTrack.pipe(processor).pipe(videoTrack.processorDestination);

                processor.setOptions({ type: 'color', color: '#00ff00' });

                const enable = async () => await processor.enable()

                enable()
                    .then(() => console.log('processors has been enabled'))
                    .catch((error) => console.log(`An error occurred during activation ${error}`));

                setUsers((previousUsers) => [
                    ...previousUsers,
                    {
                        uid,
                        videoTrack,
                        audioTrack,
                    },
                ]);
                client.publish(tracks);
            });

        const leave = async () => await client.leave()


        return () => {
            for (let localTrack of localTracks) {
                localTrack.stop();
                localTrack.close();
            }
            client.off('user-published', handleUserJoined);
            client.off('user-left', handleUserLeft);
            leave()
                .then(() => console.log("You left the channel"));
        };
    }, []);

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 200px)',
                }}
            >
                {users.map((user) => (
                    <VideoPlayer key={user.uid} user={user} />
                ))}
            </div>
        </div>
    );
};