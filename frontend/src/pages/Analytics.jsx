import React, { useContext } from "react";
import { Layout } from 'antd';
import BarChart from '../components/BarChart/BarChart';
import { ProfileContext } from '../App';
import LoadingIcon from "../components/LoadingIcon";

const { Content }  = Layout;

const Ranking = () => {
    const prof = useContext(ProfileContext);
    return (
        <>
            {prof.providerProfile.profile ? (
            <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart></BarChart>
            </Content>) : (<Layout style={{ display: 'flex', justifyContent: 'center' }}><LoadingIcon></LoadingIcon></Layout>)}
        </>
    )
}
export default Ranking;