export const VideoControllers = ({ actions }) => {


    const toggleCamera = ({ target }) => {
        const { startVideo, stopVideo } = actions;

        if (target.classList.contains('fa-video-camera')) {
            target.classList.add('fa-video-slash');
            target.classList.remove('fa-video-camera');
            target.style.color = 'red';
            stopVideo();
        } else {
            target.classList.add('fa-video-camera');
            target.classList.remove('fa-video-slash');
            target.style.color = 'black';
            startVideo();
        }
    }

    const toggleMicrophone = ({ target }) => {
        const { startAudio, stopAudio } = actions;
        if (target.classList.contains('fa-microphone')) {
            target.classList.add('fa-microphone-slash');
            target.classList.remove('fa-microphone');
            target.style.color = 'red';
            stopAudio();

        } else {
            target.classList.add('fa-microphone');
            target.classList.remove('fa-microphone-slash');
            target.style.color = 'black';
            startAudio();
        }
    }

    const toggleJoinAndLeave = ({ target }) => {
        const { startOneToOneVideoCall, leaveVideoCall } = actions;
        if (target.classList.contains('fa-plug')) {
            target.classList.add('fa-window-close');
            target.classList.remove('fas');
            target.classList.remove('fa-plug');
            target.style.color = 'red';
            leaveVideoCall();
        } else {
            target.classList.add('fas');
            target.classList.add('fa-plug');
            target.classList.remove('fa-window-close');
            target.style.color = 'black';
            startOneToOneVideoCall();
        }
    }

    const enableVirtualBackground = () => {
        const {setBackground} = actions;
        setBackground();
    }

    return (
        <>
            <div className="d-flex justify-content-center rounded position-absolute">
                <i className="fa fa-video-camera" id="btnCam" aria-hidden="true " onClick={toggleCamera}></i>
                <i className="fa fa-microphone " id="btnMic" aria-hidden="true " onClick={toggleMicrophone}></i>
                <i className="fa fas fa-plug " id="btnPlug" aria-hidden="true" onClick={toggleJoinAndLeave}></i>
                <i className="fa-sharp fa-solid fa-images fa" id="btnVirtualBackground" aria-hidden="true" onClick={enableVirtualBackground}></i>
            </div>
        </>

    )
}
