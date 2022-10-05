import { useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng';
import VirtualBackgroundExtension from 'agora-extension-virtual-background';
import { LocalVideo } from './LocalVideo';
import { RemoteVideo } from './RemoteVideo';
import { VideoControllers } from './VideoButtons';


import '../css/call.css';

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const extension = new VirtualBackgroundExtension();
AgoraRTC.registerExtensions([extension]);

let processor = null;

export const Call = ({ rtcProps = {}, virtualBackground = {} }) => {

  const [localTracks, setLocalTracks] = useState({
    audioTrack: null,
    videoTrack: null
  });

  const join = async () => {
    await client.join(rtcProps.appId, rtcProps.channel, rtcProps.token, rtcProps.uid);

  }

  const startVideo = () => {
    AgoraRTC.createCameraVideoTrack()
      .then(videoTrack => {
        setLocalTracks(tracks => ({
          ...tracks,
          videoTrack
        }));
        client.publish(videoTrack);
        videoTrack.play('local');
      })
  }

  const startAudio = () => {
    AgoraRTC.createMicrophoneAudioTrack()
      .then(audioTrack => {

        setLocalTracks(tracks => ({
          ...tracks,
          audioTrack
        }));
        client.publish(audioTrack);
        // audioTrack.play();
      });
  }

  const stopVideo = () => {
    localTracks.videoTrack.close();
    localTracks.videoTrack.stop();
    client.unpublish(localTracks.videoTrack);
  }

  const stopAudio = () => {
    localTracks.audioTrack.close();
    localTracks.audioTrack.stop();
    client.unpublish(localTracks.audioTrack);
  }

  const leaveVideoCall = () => {
    stopVideo();
    stopAudio();
    client.leave();
  }


  async function startOneToOneVideoCall() {
    join()
      .then(() => {
        startVideo();
        startAudio();

        client.on('user-published', async (user, mediaType) => {

          if (client._users.length > 1) {
            client.leave();
            alert('Please Wait Room is Full');
            return;
          }

          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            const remoteVideoTrack = user.videoTrack;
            remoteVideoTrack.play('remote');
          }

          if (mediaType === 'audio') {
            user.audioTrack.play();
          }
        });
      });
  }


  // Initialization
  async function getProcessorInstance() {

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

  async function setBackground() {
    if (localTracks.videoTrack) {
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


  useEffect(() => {
    startOneToOneVideoCall();
  }, []);


  return (

    <div className="d-flex justify-content-center w-100 p-2">
      <div className="p-2 rounded shadow-lg position-relative">

        <LocalVideo />
        <RemoteVideo />
        <VideoControllers
          actions={{
            startAudio,
            stopAudio,
            startVideo,
            stopVideo,
            leaveVideoCall,
            startOneToOneVideoCall,
            setBackground
          }}
        />
      </div>

    </div>

  )
}
