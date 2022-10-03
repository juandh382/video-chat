import { useContext, useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import VirtualBackgroundExtension from 'agora-extension-virtual-background';
import { OptionsContext } from '../context/OptionsContext'
import { Video } from './Video';


const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// Create a VirtualBackgroundExtension instance
const extension = new VirtualBackgroundExtension();

// Register the extension
AgoraRTC.registerExtensions([extension]);

let processor = null;

export const Call = () => {

  const { options } = useContext(OptionsContext)
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);


  const handleUserPublished = async (user, mediaType) => {

    await client.subscribe(user, mediaType);
    console.log("subscribe success");

    if (mediaType === "video") {

      setUsers(previousUsers => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  }

  const handleUserUnpublished = (user) => {
    setUsers((previousUsers) => previousUsers.filter((u) => u.uid !== user.uid));
  }

  useEffect(() => {

    client.on("user-published", handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);

    client
      .join(options.appId, options.channel, options.token, null)
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
        client.publish(tracks);
      });


    const leave = async () => await client.leave();

    return () => {

      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }

      client.off('user-published', handleUserPublished);
      client.off('user-left', handleUserUnpublished);

      leave()
        .then(() => console.log("You left the channel"));
    }
  }, []);

  // Initialization
  async function getProcessorInstance() {

    if (!processor && localTracks[1]) {
      // Create a VirtualBackgroundProcessor instance
      processor = extension.createProcessor();

      try {
        // Initialize the extension and pass in the URL of the Wasm file
        await processor.init(process.env.PUBLIC_URL + "/assets/wasms");
      } catch (e) {
        console.log("Fail to load WASM resource!"); return null;
      }
      // Inject the extension into the video processing pipeline in the SDK
      localTracks[1].pipe(processor).pipe(localTracks[1].processorDestination);
    }
    return processor;
  }

  async function setBackgroundColor() {
    if (localTracks[1]) {
      // document.getElementById("loading").style.display = "block";

      let processor = await getProcessorInstance();

      try {
        processor.setOptions({ type: 'color', color: '#00ff00' });
        await processor.enable();
      } finally {
        // document.getElementById("loading").style.display = "none";
      }

      // virtualBackgroundEnabled = true;
    }
  }

  return (
    <>
      <div className="row">
        <button className="btn btn-info" onClick={setBackgroundColor}>
          Enable VirtualBackground
        </button>
      </div>
      <div className="row">
        {
          users.map(user => (
            <Video key={user.uid} user={user} />
          ))
        }
      </div>
    </>
  )
}
