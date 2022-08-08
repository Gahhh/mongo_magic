import React, { useState } from "react"

import { styles } from "../styles";

import EmailForm from "./EmailForm";


const SupportWindow = props => {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)
    const [sent, setSent] = useState(false);

    return (
        <div 
            className='transition-5'
            style={{
                ...styles.supportWindow,
                ...{ opacity: props.visible ? '1' : '0',
                    zIndex: props.visible ? '501' : '-1',
                }
            }}
        >
            <EmailForm 
                prof = {props.prof}
                visible={user === null || chat === null}
                setUser={user => setUser(user)} 
                setChat={chat => setChat(chat)}
                setSent={setSent} 
                setVisible={props.setVisible}
            />
        </div>
    )
}

export default SupportWindow;
