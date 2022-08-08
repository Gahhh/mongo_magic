import React, { useRef, useEffect, useState } from "react";
import SupportWindow from './SupportWindow'
import Avatar from './Avatar'

const SupportEngine = (props) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [visible, setVisible] = useState(false);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={wrapperRef}>
            <SupportWindow prof={props.prof} visible={visible} setVisible={setVisible}/>

            <Avatar 
                onClick={() => setVisible(!visible)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                }}
            />
        </div>
    )
}

export default SupportEngine;

