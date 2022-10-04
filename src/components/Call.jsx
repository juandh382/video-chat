import { useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import VirtualBackgroundExtension from 'agora-extension-virtual-background';
import { Video } from './Video';


import '../css/call.css';

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const extension = new VirtualBackgroundExtension();
AgoraRTC.registerExtensions([extension]);

let processor = null;

export const Call = ({ rtcProps, toggleVideoCall, handleMessage, virtualBackground }) => {
  

  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);


  const handleUserPublished = async (user, mediaType) => {

    

    handleMessage(`${user.uid} ha entrado a la llamada`)
    await client.subscribe(user, mediaType);
    console.log("subscribe success");

    if (mediaType === "video" && !users.find(u => u.uid == user.uid)) {
      setUsers(previousUsers => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  }

  const handleUserUnpublished = (user) => {
    
    
    
  }

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

  async function setBackground() {
    if (localTracks[1]) {
      let processor = await getProcessorInstance();
      try {
        switch (virtualBackground.type) {
          case 'color':
            processor.setOptions({ type: 'color', color: virtualBackground.value });
            break;
          case 'blur':
            processor.setOptions({ type: 'blur', blurDegree: Number(virtualBackground.value) });
            break;

          case 'img':
            const imgElement = document.createElement('img');

            imgElement.onload = async () => {
              let processor = await getProcessorInstance();
              try {
                processor.setOptions({ type: 'img', source: imgElement });
                await processor.enable();
              } catch (error) {
                console.log(error)
              }

            }
            imgElement.src = process.env.PUBLIC_URL + '/pikachu-pokemon-logo-Cropped.jpg';
            imgElement.crossOrigin = "anonymous";
            break;

          default:
            break;
        }
        await processor.enable();
      } catch (error) {
        console.log(error)
      }
    }
  }

  const leave = async () => {
    await client.leave();
  }

  const handleUserLeft = (user) => {
    setUsers(users => users.filter(u => u.uid !== user.uid))
  }

  useEffect(() => {

    client.on("user-published", handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on("user-left", handleUserLeft)

    client
      .join(rtcProps.appId, rtcProps.channel, rtcProps.token, rtcProps.uid)
      .then((uid) =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          uid,
        ])
      )
      .then(([tracks, uid]) => {
        handleMessage(`${uid} ha entrado a la llamada`)
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

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
        localTrack.setEnabled(false)
      }

      client.off('user-published', handleUserPublished);
      client.off('user-left', handleUserUnpublished);
      client.off('user-left', handleUserLeft);
      processor = null;
      // setUsers((previousUsers) => previousUsers.filter((u) => u.uid !== rtcProps.uid))
      leave()
        .then(() => handleMessage("You left the channel"));
    }
  }, []);

  const handleClickLeave = () => toggleVideoCall();


  return (
    <>
      <div className='row py-5'>
        {
          users.map(user => (
            <Video key={user.uid} user={user} handleClickLeave={handleClickLeave} localUserUid={rtcProps.uid} virtualBackground={{ data: virtualBackground, setBackground }} />
          ))
        }
      </div>
    </>
  )
}
