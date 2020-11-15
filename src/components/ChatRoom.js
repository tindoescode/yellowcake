import React, { useState } from 'react';
import MessageCircle from 'react-feather/dist/icons/message-circle'

const ChatRoom = () => {
    const [visible, setVisible] = useState(0);

    return (<div className="ChatRoom">
        <div className="ChatRoom--Flex">
        </div>
            <iframe 
                className={`${visible ? "" : "ChatRoom--Invisible"} ChatRoom--Inner`} 
                frameBorder="0" 
                title="chatroom" 
                src="https://minnit.chat/mcoachingpublic?embed&&language=vi&nickname=" 
                width='700' 
                height='500' 
                allowtransparency="true"
                >

            </iframe>
            <div className="ChatRoom--Nav">
                <MessageCircle className="ChatRoom--Icon" size={50} onClick={() => setVisible(!visible)} />
            </div>
    </div>);
}

export default ChatRoom;