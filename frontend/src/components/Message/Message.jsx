import './Message.css';
import { useEffect } from "react";
import { useState } from "react"

const Message = ({ msg, type }) => {
    
    const [showMessage, setShowMessage] = useState(true); 
    
    useEffect(() => {
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    }, [msg]);

    return(
        <>
        {showMessage && (
            <div className={`message`}>
                <p className={`${type}`}>{msg}</p>
            </div>
        )}
        </>
    )
}

export default Message;