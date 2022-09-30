import { useState } from "react";

const ChannelForm = () => {

    const [channel, setChannel] = useState("");

    const onChange = ({ target }) => {
        let { value } = target;
        setChannel(value);
    };


    const onSubmit = e => {
        e.preventDefault();
        setChannel("");
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <label>Channel Name</label>
                <input
                    placeholder="Channel Name"
                    name="channel"
                    value={channel}
                    onChange={onChange}
                />
                <button type="submit">
                    Join Channel

                </button>
            </form>
        </>
    );
}


export default ChannelForm;