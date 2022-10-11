import { useEffect, useRef } from "react"

export const Video = ({ user }) => {

    const ref = useRef()

    useEffect(() => {

        user.videoTrack.play(ref.current);

    }, []);

    return (
        <div
            className="video-container col-md-6"
            ref={ref}
        >
        </div>
    )
}
