import React, { useContext } from "react";
import { useEffect } from "react";
import { message, Layout, Upload, Button, Input} from 'antd';
import uploadAvatar from '../assets/uploadAvatar.png';
import { ProfileContext } from '../App';
import { fileToDataUrl } from "../utils/functions";
import { updateProfile } from "../utils/requests";
import LoadingIcon from "../components/LoadingIcon";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Dragger } = Upload;

message.config({
    maxCount: 1,
})

function Profile() {
    const [user, setUser] = React.useState(null);
    const [imgUrl, setImgUrl] = React.useState(null);
    const prof = useContext(ProfileContext);
    const [change, setChange] = React.useState({});
    const navigate = useNavigate();
    const [hasDiff, setHasDiff] = React.useState(false);

    useEffect(() => {
        if (prof.providerProfile.profile) {
            setUser(prof.providerProfile.profile);
            setImgUrl(prof.providerProfile.profile.photo);
        }
    }, [prof]);

    useEffect(() => {
        let flag = false;
        for(const key of Object.keys(change)) {
            console.log(change[key], prof.providerProfile.profile[key]);
            if (change[key] !== prof.providerProfile.profile[key]){
                flag = true;
            }
        }
        setHasDiff(flag);
    },[change, prof.providerProfile.profile])

    console.log(hasDiff);

    let contentStyle = {
        padding: '24px',
        // background: '#fff',
        // minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'rgb(241,241,241)',
        // height: '100vh',
    };

    let avatarStyle = {
        borderRadius: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
    };

    let uploadStyle = {
        borderRadius: '4px',
        background: hasDiff ? '#4d7393' : '',
        color: hasDiff? '#fff': '',
        width: 'min(15vw, 200px)',
        minWidth: '150px',
        margin: '50px',
    };


    const props = {
        name: 'file',
        maxCount: 1,
        onChange(info) {
            if ((info.file.type === 'image/jpeg' || info.file.type === 'image/png') && info.file.status !== 'removed') {
                if (info.file.size > 999999) {
                    message.error('Image size should be less than 1MB');
                    return;
                }
                fileToDataUrl(info.file.originFileObj)
                    .then(response => {
                        setImgUrl(response);
                        // setImgReady(false);
                        setUser({ ...user, photo: response });
                        setChange({ ...change, photo: response });
                        info.file.status = 'done';
                    });
            }
        },
        onRemove(info) {
            // setImgReady(false);
            setImgUrl({});
        },
        style: avatarStyle,
        showUploadList: false,
        customRequest: () => { },
        accept: "image/png, image/jpeg"
    };

    const update = (data) => {
        if (data?.email === user.email) {
            delete data.email;
        }
        updateProfile(data)
            .then(res => {
                if (res.ok) {
                    if (data?.email) {
                        message.success('Email Updated, Please Login using the new Email');
                        navigate('/login');
                    } else {
                        message.success('Profile updated successfully');
                    }
                    prof.providerProfile.setProfile({ ...prof.providerProfile.profile, ...data });
                }
                else {
                    message.error('Error updating profile');
                }
            });
    };

    const setNoimg = () => {
        setImgUrl(null);
        setUser({ ...user, photo: null });
        setChange({ ...change, photo: null });
    }


    return (
        <>
                {(prof.providerProfile.profile) ? (
                    <Content style={contentStyle}>
                        <div>
                            <Dragger {...props}>
                                <div style={{ backgroundColor: 'white', borderRadius: '100%', width: '300px', height: '300px' }}>
                                    <img alt='avatar' style={{ borderRadius: '100%', width: '300px', height: '300px' }} src={imgUrl ? imgUrl : uploadAvatar}></img>
                                </div>
                            </Dragger>
                            <br>
                            </br>
                            <br>
                            </br>
                        </div>
                        <div style={{ width: '40vw', marginTop: '80px', textAlign:'center', maxWidth:'600px' }}>
                            <h3 style= {{ textAlign:'left' }}> Name</h3>
                            <Input size="large" maxLength='20' style={{ maxWidth:'600px', marginLeft:'auto', marginRight:'auto' }} defaultValue={prof.providerProfile.profile.fullname} onChange={(e) => setChange({ fullname: e.target.value })} />
                        </div>
                        <div style={{ width: '40vw', marginTop: '20px', textAlign:'center', maxWidth:'600px' }}>
                            <h3 style= {{ textAlign:'left' }}> Email</h3>
                            <Input disabled size="large" type='email' maxLength='40' style={{ width: '100%' }} defaultValue={prof.providerProfile.profile.email} onChange={(e) => setChange({ email: e.target.value })} />
                        </div>
                        <div style={{ width: '40vw', marginTop: '20px', textAlign:'center', maxWidth:'600px' }}>
                            <h3 style= {{ textAlign:'left' }}> Organisation Name</h3>
                            <Input size="large" maxLength='50' style={{ width: '100%' }} defaultValue={prof.providerProfile.profile.org} onChange={(e) => setChange({ org: e.target.value })} />
                        </div>
                        <Button disabled={!!!hasDiff} style={uploadStyle} onClick={() => (update(change))}>Update My Profile</Button>
                        <Button onClick={setNoimg} style={uploadStyle}>Remove Image</Button>
                        <div style={{ height: '40px', width: '40px' }}><br></br></div>
                    </Content>
                ) : (<Layout style={{ display: 'flex', justifyContent: 'center' }}><LoadingIcon></LoadingIcon></Layout>)}
        </> 
    );
}

export default Profile;