import React, { useContext, useEffect, useState } from "react";
import { Layout } from 'antd';
import BarChart from '../components/BarChart/BarChart';
import { ProfileContext } from '../App';
import LoadingIcon from "../components/LoadingIcon";
import DataSelector from "../components/DataSelector/DataSelector";

const { Content }  = Layout;

const Analytics = () => {
    const prof = useContext(ProfileContext);
    const [data, setData] = useState(null);

    useEffect(() => {
    },[]);
    return (
        <>
            {prof.providerProfile.profile ? (
            <Content style={{ display: 'flex',  justifyContent: 'center'}}>
                
            </Content>
            ) : (<Layout style={{ display: 'flex', justifyContent: 'center' }}><LoadingIcon></LoadingIcon></Layout>)}
        </>
    )
}
export default Analytics;