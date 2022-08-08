import React, { useState } from "react";
import { styles } from './styles'


const Avatar = props => {
    const [hovered, setHovered] = useState(false)

    return (
        <div style={props.style}>
            <div 
                className='transition-3'
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0' }
                }}
            >
                Support
            </div>

            <div 
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onClick={() => props.onClick && props.onClick()}
                className='transition-3'
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '1px solid #89c5d1' : '4px solid #4D7393' },
                }}
            />
        </div>
    )
}

export default Avatar;