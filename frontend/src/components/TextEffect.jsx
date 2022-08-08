import React from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
    'Efficiency',
    'Effectiveness',
    'Awareness'
]


const TextEffect = (props) => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            props.interval || 1500
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <>  
            <div style={{ display:'flex', flexDirection:'column', width:'100%', alignItems:'center' }}>
                <h1 style={{ order:'0', marginRight:'100px', color:'#557A95', fontSize:'25px' }}>
                Find out the <b  style={{ color: '#4D7393' }}>Best</b> practices to <b  style={{ color: '#4D7393' }}>Maximize</b> your
                </h1>
                <div style={{ display:'flex', order:'1', marginLeft:'240px', fontSize:'28px' }}>
                    <h1 style={{ color:`${props.textColor}`, marginRight:'5px' }} > Environmental - </h1>
                    <h1 style={{ color:`${props.textColor}`, width:'100px' }}>
                        <TextTransition springConfig={presets.wobbly} inline='true'>
                        {TEXTS[index % TEXTS.length]}
                    </TextTransition>
                    </h1>
                </div>
            </div>
        </>
    );
};
export default TextEffect;