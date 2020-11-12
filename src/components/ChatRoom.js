import React, { useState } from 'react';
import { Link } from 'gatsby';

const ChatRoom = () => {
    const [visible, setVisible] = useState(0);

    return (<div className="ChatRoom">
        <div>
        <button onClick={() => setVisible(!visible)}>Toggle Chatroom</button>
        </div>
            <iframe 
                className={visible ? "" : "ChatRoom--Invisible"} 
                frameborder="0" 
                title="chatroom" 
                src="https://minnit.chat/mcoachingpublic?embed&&language=vi&nickname=" 
                width='1000' 
                height='500' 
                allowtransparency="true">

            </iframe>
    </div>);
}

export default ChatRoom;