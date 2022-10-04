import { useEffect, useRef, useState } from "react"

export const Video = ({ user, handleClickLeave, localUserUid, virtualBackground }) => {
    const [trackState, setTrackState] = useState({ video: true, audio: true })
    const { data, setBackground } = virtualBackground;
    const ref = useRef()

    useEffect(() => {

        user.videoTrack.play(ref.current);
        console.log(data.enable)
        if (data.enable) {
            setBackground();
        }

    }, []);

    const toggleVideoTrack = () => {
        user.videoTrack.setEnabled(!trackState.video);
        setTrackState(ps => ({
            ...ps,
            video: !ps.video
        }));
    }

    const toggleAudioTrack = () => {
        user.audioTrack.setEnabled(!trackState.audio);
        setTrackState(ps => ({
            ...ps,
            audio: !ps.audio
        }));
    }

    return (
        <div
            className="col-md-4"
            ref={ref}
            style={{ minHeight: '500px' }}
        >
            {
                user.uid === localUserUid
                && (

                    <div>
                        <div
                            className='d-flex col-md-6 justify-content-between'
                            style={{
                                position: "relative",
                                zIndex: "99",
                                bottom: "-467px",
                                width: "100%",
                            }}
                        >

                            <button
                                onClick={toggleVideoTrack}
                                className="btn btn-info"
                            >Start/Stop Video</button>
                            <button
                                onClick={toggleAudioTrack}
                                className="btn btn-info"
                            >Start/Stop Audio</button>
                            <button
                                onClick={handleClickLeave}
                                className="btn btn-danger"
                            >Leave</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
