import { React, useRef, useEffect, useState } from "react";
import { LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import logo from '../assets/LogoBlue.png';
import dashboardLogo from '../assets/dashboardLogo.png';
import dashboardLogoSelected from '../assets/dashboardLogoSelected.png';
import resultsLogo from '../assets/resultsLogo.png';
import resultsLogoSelected from '../assets/resultsLogoSelected.png';
import analyticsLogo from '../assets/analyticsLogo.png';
import analyticsLogoSelected from '../assets/analyticsLogoSelected.png';
import profileLogo from '../assets/profileLogo.png';
import profileLogoSelected from '../assets/profileLogoSelected.png';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogout } from '../utils/requests';
import themeColor from "../config/theme";
import rankingimg from '../assets/rankingimg.jpg'
import rankingSelected from '../assets/rankingSelected.png'

const { Sider }  = Layout;

const HeaderLogo = styled.div`
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 120px;
    order: 1;
    cursor: pointer;
`;

const TopLogo = styled.img`
    position: relative;
    width: 56px;
    height: auto;
    align-items: center;
    min-width: 20px;
`
const LogoText = styled.a`
    position:relative;
    left: 5%;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
    letter-spacing: 0.04em;
    color: #4D7393;
`

const MainMenuContainer = styled.div`
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
`

const MenuLogo = styled.img`
    width: 28px;
    height: 28px;
    position: relative; 
`

/**
 * 
 * @param {*} e 
 * @returns Logo with correct offset
 */
const DashboardLogo = (e) => {
    const marRight = e.size;
    return (
        <MenuLogo src={e.src} style={{ marginRight: `${marRight}px` }} >
        </MenuLogo>
    )
}

/**
 * decode the url parameters
 */
const pageKeys = {
    'Dashboard': '1',
    'Results': '2',
    'Analytics': '3',
    'Ranking': '4',
    'Profile': '5',
    'Settings': '6',
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const NavBar = (props) =>{
    const imgRef = useRef();
    const textRef = useRef();
    const [logoOffsetLeft, setLogoOffsetLeft] = useState(null);
    const [textOffsetLeft, setTextOffsetLeft] = useState(null);
    const [itemSelected, setItemSelected] = useState(pageKeys[props.page]);
    let navigate = useNavigate();
    const [logoutHover, setLogoutHover] = useState(undefined);
    let location = useLocation();

    useEffect(() => {
        window.addEventListener("resize", getPosition);
        getPosition();
        return _ => {
            window.removeEventListener('resize', getPosition)
    }
    }, []);

    useEffect(() => {
        let pageName = location.pathname.split('/')[2];
        pageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
        setItemSelected(pageKeys[pageName]);
    },[location]);
    /**
     * Find and apply logo offset and text offset
     */
    const getPosition = () => {
        setLogoOffsetLeft(imgRef.current.offsetLeft);
        setTextOffsetLeft(textRef.current.offsetLeft);
    }

    let menuItemStyle = {
        marginTop: '20px',
        marginLeft: logoOffsetLeft + 14,
        padding: '0 15px',
    };

    /**
     * navigation and set item selected
     * @param {*} e 
     */
    const itemSelect = (e) =>{
        setItemSelected(e.key);
        const pageName = getKeyByValue(pageKeys, e.key);
        navigate(`/users/${pageName}`);
    }
    
    const handlePointerOn = (e) =>{
        switch (e.type) {
            case 'pointerenter':
                setLogoutHover(themeColor);
                break;
            case 'pointerleave':
                setLogoutHover(undefined);
                break;
            default:
                break;
        }
    }

    return (
    <>      
            
            <Sider id="Dashboard_sider">
                <HeaderLogo id="Header_container" onClick={() => (navigate('/'))}>
                    <TopLogo src={logo} alt="logo" ref={imgRef}/>
                    <LogoText ref={textRef}>G'Tracker</LogoText>
                </HeaderLogo>
                {
                    (textOffsetLeft&& logoOffsetLeft)?
                (<>
                <MainMenuContainer>
                    <Menu id = "menu" defaultSelectedKeys={itemSelected} selectedKeys={itemSelected} onSelect={(e) => itemSelect(e)} style={{left:'-40px', width:'100%', position:'relative', display: 'block', marginBottom: '20px', padding: '5px 25px'}}>
                    <Menu.Item style={{ marginLeft:`${logoOffsetLeft}px`, fontWeight: 'bolder', pointerEvents: 'none'}} key="200"  >
                            <b style={{ fontWeight: '700', fontSize:'16px'}}>Main Menu</b>
                    </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='1' src={(itemSelected === '1') ? (resultsLogoSelected): (resultsLogo) } size={textOffsetLeft - logoOffsetLeft - 42} />} style={menuItemStyle} key="1">
                            Home
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='2' src={(itemSelected === '2') ? (dashboardLogoSelected): (dashboardLogo)  } size={textOffsetLeft - logoOffsetLeft - 42}/>} style={menuItemStyle} key="2">
                            Results
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='3' src={(itemSelected === '3') ? (analyticsLogoSelected): (analyticsLogo) } size={textOffsetLeft - logoOffsetLeft - 42}/>} style={menuItemStyle} key="3">
                            Analytics
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='4' src={(itemSelected === '4') ? (rankingSelected): (rankingimg) } size={textOffsetLeft - logoOffsetLeft - 42}/>} style={menuItemStyle} key="4">
                            Ranking
                        </Menu.Item>
                        <Menu.Item icon={<DashboardLogo id='5' src={(itemSelected === '5') ? (profileLogoSelected): (profileLogo) } size={textOffsetLeft - logoOffsetLeft - 42} />} style={menuItemStyle} key="5">
                            Profile
                        </Menu.Item>
                    </Menu>
                </MainMenuContainer>
                <div onClick={() => {userLogout()}} onPointerEnter={(e) => (handlePointerOn(e))} onPointerLeave={(e) => {handlePointerOn(e)}} style={{padding:'8px',cursor:'pointer', display:'flex', justifyContent:'right', position:'absolute', top:'500px', right:'5px'}}>
                    <b style={{ color:logoutHover, padding:'3px' }}>Logout</b>
                    <LogoutOutlined onPointerEnter={(e) => (handlePointerOn(e))} onPointerLeave={(e) => {handlePointerOn(e)}} style={{ padding:'3px', fontSize:'20px', color:logoutHover  }}></LogoutOutlined>
                </div>
                </>
                ) : (<></>)
            }
            </Sider>
    </>
);

}
export default NavBar;