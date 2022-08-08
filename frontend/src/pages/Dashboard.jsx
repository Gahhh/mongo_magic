import { React } from "react";
import { Layout, Button } from 'antd';
import '../App.css';
import TextEffect from '../components/TextEffect';
import { useContext } from 'react';
import { ProfileContext } from "../App";
import LoadingIcon from '../components/LoadingIcon';
import themeColor from '../config/theme';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const Dashboard = (props) => {
    const profile = useContext(ProfileContext);
    const navigate = useNavigate();

    const goAssessment = () => {
        navigate('/assessment');
    }

    return (
        <>  
                <Content style={{ minWidth:'500px',display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
                    {(profile?.providerProfile?.profile?.email == undefined) ? (<LoadingIcon></LoadingIcon>) :
                    (<>
                    <TextEffect textColor={themeColor} />
                    <span style={{ fontSize:'20px' }}>
                                    <Button style={{ backgroundColor:'#7395AE', color:'#FFFDFF', height:'48px', width:'200px', fontSize:'20px' }} onClick={goAssessment}>Get Assessed Now</Button>
                                </span>
                    </>
                    )}
                </Content>
        </>
    );

}
export default Dashboard