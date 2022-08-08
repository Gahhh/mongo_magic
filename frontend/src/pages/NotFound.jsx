import styled from 'styled-components';
import { Button } from 'antd';
import Image404 from "../assets/404Image.png";
import { useNavigate } from 'react-router-dom';

const ImageContainer = styled.img`
    display: block;
    justify-content: center;
    align-items: center;
    height: 25vh;
    width: 30vw;
    margin: 20vh auto 10vh auto;
    min-height: 200px;
    min-width: 300px;
`;

const Text404 = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 150%;

    text-align: center;
    letter-spacing: 0.05em;

    color: #222222;
`

const TextDescription = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 10px;
    text-align: center;
    letter-spacing: 0.02em;

    color: #94959B;
`

const btnTextStyle = {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '30px',
    /* identical to box height */
    
    letterSpacing: '0.02em',
    
    /* Text/White */
    
    color: '#FFFFFF'
}

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }

    return (
        <div style={{ background: '#F6F6F6', height: '100vh', width: '100%', textAlign: 'center', justifyContent: 'center', alignContent: '' }}>
            <ImageContainer src={Image404} />
            <Text404>404 Not Found</Text404>
            <TextDescription>Oops! It seems like the page you are looking for is not available! </TextDescription>
            <TextDescription>Please try again with another page or go back to home.</TextDescription>
            <Button type="primary" style={{ backgroundColor:'#4D7393', marginTop:'20px', borderRadius:'8px', height:'60px', width:'200px' }} onClick={() => goHome()}>
                <b style={btnTextStyle}> Back to Homepage</b>
            </Button>
        </div>
    );
}

export default NotFound;