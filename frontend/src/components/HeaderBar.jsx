import { React, useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import { Layout, Image, message } from 'antd';
import { ProfileContext } from '../App';
import { getProfile } from '../utils/requests';
import { useNavigate } from 'react-router-dom';
import noAvatar from '../assets/noAvatar.png'

import '../App.css';


const { Header } = Layout;

const UserContainer = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const LeftContainer = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const DashBoardText = styled.b`
    position:absolute; 
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.04em;
    margin-left: 5px;
`

const UserNameCompany = styled.div`
    max-height: 40px;
    overflow-x: visible;
    /* display: inline-block; */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const HeaderBar = (props) => {
    const [profile, setProfile] = useState(undefined);
    const prof = useContext(ProfileContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (prof.providerProfile.profile && (!objectEqual(prof.providerProfile.profile, profile))) {
            setProfile(prof.providerProfile.profile);
        }
        if (!prof?.providerProfile?.profile) {
            getProfile().then(res => {
                if (res.ok) {
                    res.json().then(
                        data => {
                            prof.providerProfile.setProfile(data);
                            setProfile(data);
                        }
                    )
                } else {
                    const responseContent = (
                        <>
                            <h>Please Login</h>
                            <br></br>
                            <h>Redirecting...</h>
                        </>
                    );
                    message.error(responseContent, 2)
                        .then(() => {
                            window.location.href = "/login";
                        });

                }
            })
        }
        if (!localStorage.getItem('userToken')) {
            const responseContent = (
                <>
                    <h>Please Login</h>
                    <br></br>
                    <h>Redirecting...</h>
                </>
            );
            message.error(responseContent, 2)
                .then(() => {
                    window.location.href = "/login";
                });
        }
        // checkToken();
    }, [prof.providerProfile.profile]);

    const objectEqual = (obj1, obj2) => {
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return false;
        }
        const obj1Length = Object.keys(obj1).length;
        const obj2Length = Object.keys(obj2).length;

        if (obj1Length === obj2Length) {
            return Object.keys(obj1).every(
                key => obj2.hasOwnProperty(key)
                    && obj2[key] === obj1[key]);
        }
        return false;
    }

    const mouseOnUser = (e) =>{
        navigate('/users/profile')
    }

    return (
        (profile === undefined ? <></> :
            <Header style={{ backgroundColor: '#FBFBFB', display: 'flex', justifyContent: 'space-between', lineHeight:'40px', textAlign:'center'}}>
                <LeftContainer>
                    <DashBoardText style={{ marginLeft:'30px'}}>{props.page}</DashBoardText>
                </LeftContainer>
                <UserContainer onClick={(e) => mouseOnUser(e)}>
                    <Image
                        style={{  }}
                        width={40}
                        height={40}
                        src="error"
                        fallback= {(prof.providerProfile.profile.photo) ? prof.providerProfile.profile.photo: noAvatar}
                    />
                    <UserNameCompany style={{ marginLeft:'10px' }}>
                        <p style={{ fontWeight: 'bold', lineHeight:'10px', marginTop:'10px' }}>{profile.fullname}</p>
                        <h4 style={{ lineHeight:'5px', fontWeight:'300' }}>{profile.org}</h4>
                    </UserNameCompany>
                </UserContainer>
            </Header>
        )
    )
}

export default HeaderBar;