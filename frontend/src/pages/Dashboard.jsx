import { React } from "react";
import { Layout, Button } from 'antd';
import '../App.css';
import { checkToken } from '../utils/functions';
import TextEffect from '../components/TextEffect';
import { useContext } from 'react';
import { ProfileContext } from "../App";
import HeaderBar from '../components/HeaderBar';
import LoadingIcon from '../components/LoadingIcon';
import themeColor from '../config/theme';

const { Content } = Layout;

const Dashboard = (props) => {
    const profile = useContext(ProfileContext);
    // console.log((profile?.providerProfile?.profile?.email == undefined));

    return (
        <>  
                <Content style={{ minWidth:'500px',display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
                    {(profile?.providerProfile?.profile?.email == undefined) ? (<LoadingIcon></LoadingIcon>) :
                    (<>
                    <TextEffect textColor={themeColor} />
                    <span style={{ fontSize:'20px' }}>
                                    <a href='/assessment' style= {{ color:`${themeColor}` }}> Get Tested Now >></a>
                                </span>
                    </>
                    )}
                </Content>
        </>
    );

}
export default Dashboard;