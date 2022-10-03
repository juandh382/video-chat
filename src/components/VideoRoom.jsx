
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
// Register the extension
AgoraRTC.registerExtensions([extension]);


export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);
    const [processor, setProcessor] = useState();

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

    // Initialization
    const getProcessorInstance = async () => {
        if (!processor && localTracks.videoTrack) {
            // Create a VirtualBackgroundProcessor instance
            processor = extension.createProcessor();

            try {
                // Initialize the extension and pass in the URL of the Wasm file
                await processor.init(process.env.PUBLIC_URL + "/assets/wasms");
            } catch (e) {
                console.log("Fail to load WASM resource!"); return null;
            }
            // Inject the extension into the video processing pipeline in the SDK
            localTracks.videoTrack.pipe(processor).pipe(localTracks.videoTrack.processorDestination);
        }
        return processor;
    }


    // Set a solid color as the background
    const setBackgroundColor = async () => {
        if (localTracks.videoTrack) {

            try {
                let processor = await getProcessorInstance();

                setProcessor(processor);

                processor.setOptions({ type: 'color', color: '#00ff00' });
                await processor.enable();
            } catch (error) {
                console.log(`An error occurred enabling the virtual background ${error}`)
            }

            // virtualBackgroundEnabled = true;
        }
    }



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

                setUsers((previousUsers) => [
                    ...previousUsers,
                    {
                        uid,
                        videoTrack,
                        audioTrack,
                    },
                ]);

                setBackgroundColor()
                    .then(() => console.log('Virtual background enabled'))
                    .catch(error => console.log(`An error occurred enabling the virtual background ${error}`));


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